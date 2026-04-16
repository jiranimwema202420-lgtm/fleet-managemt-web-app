export type VehicleStatus = "In Transit" | "Idle" | "Maintenance";

export type FleetVehicleRecord = {
  vehicle: string;
  driver: string;
  status: VehicleStatus;
  route: string;
  eta: string;
  fuelLevel: number;
  utilization: number;
  lastServiceDate: string;
  nextServiceDate: string;
};
