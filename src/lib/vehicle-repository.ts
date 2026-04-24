import { addDoc, collection, deleteDoc, doc, getDocs, query, serverTimestamp } from "firebase/firestore";
import { dbServer, isFirebaseConfigured } from "@/firebase/server";
import { addVehicle, getVehicles, removeVehicle } from "@/lib/fleet-store";
import type { FleetVehicleRecord } from "@/types/fleet";

const COLLECTION = "vehicles";

export async function listVehicles(): Promise<FleetVehicleRecord[]> {
  if (!isFirebaseConfigured()) {
    return getVehicles();
  }

  const snapshot = await getDocs(query(collection(dbServer, COLLECTION)));
  return snapshot.docs.map((vehicleDoc) => {
    const data = vehicleDoc.data() as Omit<FleetVehicleRecord, "id">;
    return {
      id: vehicleDoc.id,
      ...data,
    };
  });
}

export async function createVehicle(vehicle: FleetVehicleRecord): Promise<FleetVehicleRecord> {
  if (!isFirebaseConfigured()) {
    return addVehicle(vehicle);
  }

  const { id: _id, ...payload } = vehicle;
  const ref = await addDoc(collection(dbServer, COLLECTION), {
    ...payload,
    createdAt: serverTimestamp(),
  });

  return {
    ...vehicle,
    id: ref.id,
  };
}

export async function deleteVehicle(id: string): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    return removeVehicle(id);
  }

  await deleteDoc(doc(dbServer, COLLECTION, id));
  return true;
}
