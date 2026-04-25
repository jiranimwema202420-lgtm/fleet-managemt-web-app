let appCache: unknown | null = null;
let authCache: unknown | null = null;
let dbCache: unknown | null = null;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const dynamicImport = new Function("m", "return import(m)") as (moduleName: string) => Promise<any>;

export function isFirebaseClientConfigured() {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId);
}

export async function getFirebaseClient() {
  if (!isFirebaseClientConfigured()) {
    return null;
  }

  if (appCache && authCache && dbCache) {
    return { app: appCache, auth: authCache, db: dbCache };
  }

  try {
    const appModule = await dynamicImport("firebase/app");
    const authModule = await dynamicImport("firebase/auth");
    const firestoreModule = await dynamicImport("firebase/firestore");

    const app = appModule.getApps().length > 0 ? appModule.getApps()[0] : appModule.initializeApp(firebaseConfig);
    const auth = authModule.getAuth(app);
    const db = firestoreModule.getFirestore(app);

    appCache = app;
    authCache = auth;
    dbCache = db;

    return { app, auth, db };
  } catch {
    return null;
  }
}
