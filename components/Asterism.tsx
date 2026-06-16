/* §5.5 — Section divider: brass hairline + diya glyph.
   The only ornament on the site. Use 3–5 per page between major sections. */
export default function Asterism() {
  return (
    <div
      className="my-16 flex items-center gap-4"
      role="separator"
      aria-hidden="true"
    >
      <hr className="rule-brass flex-1" />
      <img
        src="/marks/diya.svg"
        alt=""
        style={{ width: "12px", height: "12px", opacity: 0.65 }}
      />
      <hr className="rule-brass flex-1" />
    </div>
  );
}
