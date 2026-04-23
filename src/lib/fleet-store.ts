import { fleetRecords as seedRecords } from "@/data/fleet-data";
import type { FleetVehicleRecord } from "@/types/fleet";

let records: FleetVehicleRecord[] = [...seedRecords];

export function getVehicles(): FleetVehicleRecord[] {
  return records;
}

export function addVehicle(vehicle: FleetVehicleRecord): FleetVehicleRecord {
  records = [vehicle, ...records];
  return vehicle;
}

export function removeVehicle(id: string): boolean {
  const before = records.length;
  records = records.filter((record) => record.id !== id);
  return records.length < before;
}
