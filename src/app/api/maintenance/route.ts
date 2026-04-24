import { NextResponse } from "next/server";
import { getMaintenanceAlerts } from "@/lib/fleet-functions";
import { listVehicles } from "@/lib/vehicle-repository";

export async function GET() {
  const alerts = getMaintenanceAlerts(await listVehicles());
  return NextResponse.json({ data: alerts, count: alerts.length });
}
