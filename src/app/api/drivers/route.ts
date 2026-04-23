import { NextResponse } from "next/server";
import { getDriverSummaries } from "@/lib/fleet-functions";
import { getVehicles } from "@/lib/fleet-store";

export async function GET() {
  const summaries = getDriverSummaries(getVehicles());
  return NextResponse.json({ data: summaries, count: summaries.length });
}
