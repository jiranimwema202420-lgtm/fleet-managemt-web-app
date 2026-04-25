"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getFirebaseClient } from "@/firebase/config";

type FirebaseContextValue = {
  uid: string | null;
  loading: boolean;
};

const FirebaseContext = createContext<FirebaseContextValue>({ uid: null, loading: true });
const dynamicImport = new Function("m", "return import(m)") as (moduleName: string) => Promise<any>;

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    async function init() {
      const client = await getFirebaseClient();

      if (!client) {
        if (active) {
          setLoading(false);
        }
        return;
      }

      try {
        const authModule = await dynamicImport("firebase/auth");

        unsubscribe = authModule.onAuthStateChanged(client.auth as never, (user: { uid: string } | null) => {
          if (user) {
            setUid(user.uid);
            setLoading(false);
            return;
          }

          authModule
            .signInAnonymously(client.auth as never)
            .then((credential: { user: { uid: string } }) => {
              setUid(credential.user.uid);
            })
            .catch(() => {
              setUid(null);
            })
            .finally(() => {
              setLoading(false);
            });
        });
      } catch {
        setUid(null);
        setLoading(false);
      }
    }

    void init();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const value = useMemo(() => ({ uid, loading }), [loading, uid]);

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export function useFirebaseSession() {
  return useContext(FirebaseContext);
}
