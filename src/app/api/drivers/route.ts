import { NextResponse } from "next/server";
import { getDriverSummaries } from "@/lib/fleet-functions";
import { listVehicles } from "@/lib/vehicle-repository";

export async function GET() {
  const summaries = getDriverSummaries(await listVehicles());
  return NextResponse.json({ data: summaries, count: summaries.length });
}
