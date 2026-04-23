"use client";

import { useEffect, useState } from "react";

type ApiResponse<T> = {
  data: T;
  count: number;
};

export function useFleetApi<T>(endpoint: string, initialData: T) {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch(endpoint, { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload: ApiResponse<T> = await response.json();
        if (active) {
          setData(payload.data);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Failed to load data.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [endpoint]);

  return { data, loading, error };
}
