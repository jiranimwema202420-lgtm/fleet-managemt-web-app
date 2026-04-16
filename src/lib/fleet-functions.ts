import type { FleetVehicleRecord, VehicleStatus } from "@/types/fleet";

export type FleetSortBy = "vehicle" | "fuel-high" | "fuel-low" | "utilization-high";

export function filterFleetRecords(
  records: FleetVehicleRecord[],
  query: string,
  status: VehicleStatus | "All",
): FleetVehicleRecord[] {
  const normalizedQuery = query.trim().toLowerCase();

  return records.filter((record) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      record.vehicle.toLowerCase().includes(normalizedQuery) ||
      record.driver.toLowerCase().includes(normalizedQuery) ||
      record.route.toLowerCase().includes(normalizedQuery);
    const matchesStatus = status === "All" || record.status === status;

    return matchesQuery && matchesStatus;
  });
}

export function sortFleetRecords(records: FleetVehicleRecord[], sortBy: FleetSortBy): FleetVehicleRecord[] {
  const copy = [...records];

  copy.sort((a, b) => {
    if (sortBy === "fuel-high") return b.fuelLevel - a.fuelLevel;
    if (sortBy === "fuel-low") return a.fuelLevel - b.fuelLevel;
    if (sortBy === "utilization-high") return b.utilization - a.utilization;
    return a.vehicle.localeCompare(b.vehicle);
  });

  return copy;
}

export function getFleetTotals(records: FleetVehicleRecord[]) {
  const active = records.filter((record) => record.status === "In Transit").length;
  const maintenance = records.filter((record) => record.status === "Maintenance").length;
  const avgFuel = records.length === 0 ? 0 : records.reduce((sum, record) => sum + record.fuelLevel, 0) / records.length;
  const avgUtilization =
    records.length === 0 ? 0 : records.reduce((sum, record) => sum + record.utilization, 0) / records.length;

  return {
    active,
    maintenance,
    avgFuel,
    avgUtilization,
  };
}

export function getMaintenanceAlerts(records: FleetVehicleRecord[]): FleetVehicleRecord[] {
  return records.filter((record) => record.status === "Maintenance" || record.fuelLevel < 40);
}

export function getDriverSummaries(records: FleetVehicleRecord[]) {
  const driverMap = new Map<string, { vehicles: number; avgFuel: number; avgUtilization: number }>();

  for (const record of records) {
    const current = driverMap.get(record.driver) ?? { vehicles: 0, avgFuel: 0, avgUtilization: 0 };
    const vehicles = current.vehicles + 1;

    driverMap.set(record.driver, {
      vehicles,
      avgFuel: (current.avgFuel * current.vehicles + record.fuelLevel) / vehicles,
      avgUtilization: (current.avgUtilization * current.vehicles + record.utilization) / vehicles,
    });
  }

  return Array.from(driverMap.entries())
    .map(([driver, summary]) => ({ driver, ...summary }))
    .sort((a, b) => b.avgUtilization - a.avgUtilization);
}
