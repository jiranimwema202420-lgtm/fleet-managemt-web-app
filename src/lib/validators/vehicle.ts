import { z } from "zod";

export const vehicleStatusSchema = z.enum(["In Transit", "Idle", "Maintenance"]);

export const createVehicleSchema = z.object({
  id: z.string().optional(),
  vehicle: z.string().min(2, "Vehicle name is required."),
  driver: z.string().min(2, "Driver name is required."),
  status: vehicleStatusSchema,
  route: z.string().min(2, "Route is required."),
  eta: z.string().min(1, "ETA is required."),
  fuelLevel: z.number().min(0).max(100).optional(),
  utilization: z.number().min(0).max(100).optional(),
  lastServiceDate: z.string().optional(),
  nextServiceDate: z.string().optional(),
});

export type CreateVehicleInput = z.infer<typeof createVehicleSchema>;
