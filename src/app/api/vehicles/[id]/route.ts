import { NextResponse } from "next/server";
import { deleteVehicle } from "@/lib/vehicle-repository";

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || id.trim().length < 2) {
    return NextResponse.json({ error: "Invalid vehicle id." }, { status: 400 });
  }

  try {
    const removed = await deleteVehicle(id);

    if (!removed) {
      return NextResponse.json({ error: "Vehicle not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete vehicle." }, { status: 500 });
  }
}
