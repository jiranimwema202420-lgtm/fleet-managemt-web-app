import { NextResponse } from "next/server";
import { createVehicle, listVehicles } from "@/lib/vehicle-repository";
import { createVehicleSchema } from "@/lib/validators/vehicle";
import type { FleetVehicleRecord } from "@/types/fleet";

export async function GET() {
  const vehicles = await listVehicles();
  return NextResponse.json({ data: vehicles, count: vehicles.length });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = createVehicleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid payload.",
        issues: parsed.error.issues.map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      },
      { status: 400 },
    );
  }

  const input = parsed.data;

  const newVehicle: FleetVehicleRecord = {
    id: input.id ?? `fl-${Math.random().toString(36).slice(2, 7)}`,
    vehicle: input.vehicle,
    driver: input.driver,
    status: input.status,
    route: input.route,
    eta: input.eta,
    fuelLevel: input.fuelLevel ?? 70,
    utilization: input.utilization ?? 50,
    lastServiceDate: input.lastServiceDate ?? "2026-04-01",
    nextServiceDate: input.nextServiceDate ?? "2026-06-01",
  };

  const createdVehicle = await createVehicle(newVehicle);
  return NextResponse.json({ data: createdVehicle }, { status: 201 });
}
