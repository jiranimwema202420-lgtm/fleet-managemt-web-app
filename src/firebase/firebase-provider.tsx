"use client";

import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "@/firebase/config";

type FirebaseContextValue = {
  uid: string | null;
  loading: boolean;
};

const FirebaseContext = createContext<FirebaseContextValue>({ uid: null, loading: true });

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [uid, setUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        setLoading(false);
        return;
      }

      signInAnonymously(auth)
        .then((credential) => {
          setUid(credential.user.uid);
        })
        .catch(() => {
          setUid(null);
        })
        .finally(() => {
          setLoading(false);
        });
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({ uid, loading }), [loading, uid]);

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
}

export function useFirebaseSession() {
  return useContext(FirebaseContext);
}
