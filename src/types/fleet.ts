export type VehicleStatus = "In Transit" | "Idle" | "Maintenance";

export type FleetVehicleRecord = {
  id: string;
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
