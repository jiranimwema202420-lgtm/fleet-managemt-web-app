import { NextResponse } from "next/server";
import { getMaintenanceAlerts } from "@/lib/fleet-functions";
import { getVehicles } from "@/lib/fleet-store";

export async function GET() {
  const alerts = getMaintenanceAlerts(getVehicles());
  return NextResponse.json({ data: alerts, count: alerts.length });
}
