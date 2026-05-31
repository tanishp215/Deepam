"""
Deepam - Tier 1 Signal Collection Script
=========================================
Collects publicly available signals for NC Hindu temples:
  - Wayback Machine snapshot history (digital presence over time)
  - Google Maps review timestamps (via Places API if key provided)
  - Social media post frequency (manual input or scraping hooks)

Output: public/signals.json  (read by the Next.js frontend)

Usage:
    python scripts/collect_signals.py
    python scripts/collect_signals.py --temple hsnc-morrisville
    python scripts/collect_signals.py --dry-run
"""

import argparse
import datetime
import json
import time
import urllib.request
import urllib.parse
from pathlib import Path

# ---------------------------------------------------------------------------
# Temple registry - mirrors data/temples.ts IDs and websites
# ---------------------------------------------------------------------------
TEMPLES = [
    {"id": "hsnc-morrisville",      "name": "Hindu Society of NC",          "website": "hsnctemple.org"},
    {"id": "sv-temple-cary",        "name": "Sri Venkateswara Temple NC",    "website": "svtemplenc.org"},
    {"id": "baps-raleigh",          "name": "BAPS Shri Swaminarayan Mandir - Raleigh", "website": "baps.org"},
    {"id": "isso-cary",             "name": "ISSO Shree Swaminarayan Mandir","website": "issonc.org"},
    {"id": "skvnc-cary",            "name": "Shri Krishna Vrundavana NC",    "website": "skvnc.org"},
    {"id": "ssmnc-cary",            "name": "Sri Shirdi Saibaba Mandir NC",  "website": "ssmnc.org"},
    {"id": "ssv-durham",            "name": "Sri Siddhi Vinayaka Temple NC", "website": "srisiddhivinayakatemple.org"},
    {"id": "iskcon-hillsborough",   "name": "ISKCON New Goloka Dhama",       "website": "newgoloka.com"},
    {"id": "hcclt-charlotte",       "name": "Hindu Center of Charlotte",     "website": "hcclt.org"},
    {"id": "triad-hindu-greensboro","name": "Triad Hindu Temple",            "website": "triadhindutemple.com"},
]

# ---------------------------------------------------------------------------
# Wayback Machine CDX API
# ---------------------------------------------------------------------------

def fetch_wayback_snapshots(domain: str, limit: int = 30) -> list[dict]:
    """
    Query the Wayback Machine CDX API for snapshot history of a domain.
    Returns list of dicts with timestamp and HTTP status code.
    """
    url = (
        "http://web.archive.org/cdx/search/cdx"
        f"?url={urllib.parse.quote(domain)}"
        "&output=json"
        f"&limit={limit}"
        "&fl=timestamp,statuscode"
        "&filter=statuscode:200"
        "&collapse=timestamp:6"  # one snapshot per month
    )
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Deepam-research/1.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            rows = json.loads(resp.read())
            if len(rows) <= 1:
                return []
            return [
                {"timestamp": r[0], "status": r[1]}
                for r in rows[1:]
            ]
    except Exception as exc:
        print(f"  [wayback] error for {domain}: {exc}")
        return []


def snapshot_gap_months(snapshots: list[dict]) -> float | None:
    """
    Returns the largest gap in months between consecutive snapshots.
    A large gap late in the timeline is the MNAR signal.
    """
    if len(snapshots) < 2:
        return None

    def parse_ts(ts: str) -> datetime.datetime:
        return datetime.datetime.strptime(ts[:8], "%Y%m%d")

    dates = sorted(parse_ts(s["timestamp"]) for s in snapshots)
    gaps = [
        (dates[i + 1] - dates[i]).days / 30.44
        for i in range(len(dates) - 1)
    ]
    return max(gaps) if gaps else None


# ---------------------------------------------------------------------------
# Main collection loop
# ---------------------------------------------------------------------------

def collect_temple(temple: dict, dry_run: bool = False) -> dict:
    print(f"  Collecting: {temple['name']} ({temple['website']})")
    result = {
        "id":            temple["id"],
        "name":          temple["name"],
        "collected_at":  datetime.datetime.utcnow().isoformat() + "Z",
        "wayback": {
            "snapshots":       [],
            "max_gap_months":  None,
            "first_snapshot":  None,
            "last_snapshot":   None,
            "total_snapshots": 0,
        },
    }

    if dry_run:
        print("    [dry-run] skipping network requests")
        return result

    snapshots = fetch_wayback_snapshots(temple["website"])
    result["wayback"]["snapshots"]       = snapshots
    result["wayback"]["total_snapshots"] = len(snapshots)
    result["wayback"]["max_gap_months"]  = snapshot_gap_months(snapshots)
    if snapshots:
        result["wayback"]["first_snapshot"] = snapshots[0]["timestamp"]
        result["wayback"]["last_snapshot"]  = snapshots[-1]["timestamp"]

    return result


def main() -> None:
    parser = argparse.ArgumentParser(description="Deepam Tier 1 signal collector")
    parser.add_argument("--temple", help="Collect a single temple by ID")
    parser.add_argument("--dry-run", action="store_true", help="Skip network requests")
    args = parser.parse_args()

    targets = (
        [t for t in TEMPLES if t["id"] == args.temple]
        if args.temple
        else TEMPLES
    )

    if not targets:
        print(f"No temple found with id '{args.temple}'")
        return

    print(f"Collecting signals for {len(targets)} temple(s)...")
    results: dict[str, dict] = {}

    for temple in targets:
        data = collect_temple(temple, dry_run=args.dry_run)
        results[temple["id"]] = data
        if not args.dry_run:
            time.sleep(1.0)  # be polite to the Wayback API

    out_path = Path(__file__).parent.parent / "public" / "signals.json"
    out_path.parent.mkdir(exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(results, f, indent=2)

    print(f"\nSaved to {out_path}")

    # Quick summary
    for tid, data in results.items():
        gap = data["wayback"]["max_gap_months"]
        total = data["wayback"]["total_snapshots"]
        flag = " [LARGE GAP]" if gap and gap > 6 else ""
        print(f"  {tid}: {total} snapshots, max gap {gap:.1f}mo{flag}" if gap else f"  {tid}: {total} snapshots")


if __name__ == "__main__":
    main()
