import { NextResponse } from "next/server";
import { removeVehicle } from "@/lib/fleet-store";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const removed = removeVehicle(id);

  if (!removed) {
    return NextResponse.json({ error: "Vehicle not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
