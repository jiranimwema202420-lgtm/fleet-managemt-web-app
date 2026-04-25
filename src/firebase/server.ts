const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const dynamicImport = new Function("m", "return import(m)") as (moduleName: string) => Promise<any>;

export function isFirebaseConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}

let dbCache: unknown | null = null;

export async function getServerDb() {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (dbCache) {
    return dbCache;
  }

  try {
    const appModule = await dynamicImport("firebase/app");
    const firestoreModule = await dynamicImport("firebase/firestore");

    const app = appModule.getApps().length > 0 ? appModule.getApps()[0] : appModule.initializeApp(firebaseConfig);
    const db = firestoreModule.getFirestore(app);
    dbCache = db;
    return db;
  } catch {
    return null;
  }
}
