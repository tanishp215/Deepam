import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const templeId = searchParams.get("templeId");

  if (!templeId) {
    return NextResponse.json({ error: "templeId required" }, { status: 400 });
  }

  const pledges = await prisma.pledge.findMany({
    where: { templeId },
    select: {
      id: true,
      eventName: true,
      name: true,
      isPublic: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Group by event
  const byEvent: Record<
    string,
    { count: number; publicNames: string[] }
  > = {};
  for (const p of pledges) {
    if (!byEvent[p.eventName]) {
      byEvent[p.eventName] = { count: 0, publicNames: [] };
    }
    byEvent[p.eventName].count++;
    if (p.isPublic) {
      byEvent[p.eventName].publicNames.push(p.name);
    }
  }

  return NextResponse.json({ templeId, byEvent, total: pledges.length });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body || !body.templeId || !body.eventName || !body.name) {
    return NextResponse.json(
      { error: "templeId, eventName, and name are required" },
      { status: 400 }
    );
  }

  const { templeId, eventName, name, isPublic = false } = body;

  if (
    typeof templeId !== "string" ||
    typeof eventName !== "string" ||
    typeof name !== "string"
  ) {
    return NextResponse.json({ error: "Invalid input types" }, { status: 400 });
  }

  const pledge = await prisma.pledge.create({
    data: {
      templeId: templeId.slice(0, 100),
      eventName: eventName.slice(0, 200),
      name: name.slice(0, 80),
      isPublic: Boolean(isPublic),
    },
  });

  return NextResponse.json({ success: true, pledgeId: pledge.id }, { status: 201 });
}
