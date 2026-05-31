import { NextResponse } from "next/server";
import { getActiveTemples } from "@/data/temples";

export async function GET() {
  return NextResponse.json(getActiveTemples());
}
