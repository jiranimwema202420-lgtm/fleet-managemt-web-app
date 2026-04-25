import { getServerDb, isFirebaseConfigured } from "@/firebase/server";
import { addVehicle, getVehicles, removeVehicle } from "@/lib/fleet-store";
import type { FleetVehicleRecord } from "@/types/fleet";

const COLLECTION = "vehicles";
const dynamicImport = new Function("m", "return import(m)") as (moduleName: string) => Promise<any>;

export async function listVehicles(): Promise<FleetVehicleRecord[]> {
  if (!isFirebaseConfigured()) {
    return getVehicles();
  }

  try {
    const db = await getServerDb();
    if (!db) {
      return getVehicles();
    }

    const firestore = await dynamicImport("firebase/firestore");
    const snapshot = await firestore.getDocs(firestore.query(firestore.collection(db as never, COLLECTION)));

    return snapshot.docs.map((vehicleDoc: { id: string; data: () => Omit<FleetVehicleRecord, "id"> }) => {
      const data = vehicleDoc.data();
      return {
        id: vehicleDoc.id,
        ...data,
      };
    });
  } catch {
    return getVehicles();
  }
}

export async function createVehicle(vehicle: FleetVehicleRecord): Promise<FleetVehicleRecord> {
  if (!isFirebaseConfigured()) {
    return addVehicle(vehicle);
  }

  try {
    const db = await getServerDb();
    if (!db) {
      return addVehicle(vehicle);
    }

    const firestore = await dynamicImport("firebase/firestore");
    const { id: _id, ...payload } = vehicle;
    const ref = await firestore.addDoc(firestore.collection(db as never, COLLECTION), {
      ...payload,
      createdAt: firestore.serverTimestamp(),
    });

    return {
      ...vehicle,
      id: ref.id,
    };
  } catch {
    return addVehicle(vehicle);
  }
}

export async function deleteVehicle(id: string): Promise<boolean> {
  if (!isFirebaseConfigured()) {
    return removeVehicle(id);
  }

  try {
    const db = await getServerDb();
    if (!db) {
      return removeVehicle(id);
    }

    const firestore = await dynamicImport("firebase/firestore");
    await firestore.deleteDoc(firestore.doc(db as never, COLLECTION, id));
    return true;
  } catch {
    return removeVehicle(id);
  }
}
