import { NextResponse } from "next/server";
import { addVehicle, getVehicles } from "@/lib/fleet-store";
import type { FleetVehicleRecord } from "@/types/fleet";

export async function GET() {
  const vehicles = getVehicles();
  return NextResponse.json({ data: vehicles, count: vehicles.length });
}

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<FleetVehicleRecord>;

  if (!body.vehicle || !body.driver || !body.route || !body.eta || !body.status) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const newVehicle: FleetVehicleRecord = {
    id: body.id ?? `fl-${Math.random().toString(36).slice(2, 7)}`,
    vehicle: body.vehicle,
    driver: body.driver,
    status: body.status,
    route: body.route,
    eta: body.eta,
    fuelLevel: body.fuelLevel ?? 70,
    utilization: body.utilization ?? 50,
    lastServiceDate: body.lastServiceDate ?? "2026-04-01",
    nextServiceDate: body.nextServiceDate ?? "2026-06-01",
  };

  addVehicle(newVehicle);
  return NextResponse.json({ data: newVehicle }, { status: 201 });
}
