import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export default function useFetch<T>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isCancelled = false;

    async function run() {
      setState({ data: null, loading: true, error: null });

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }

        const json = (await res.json()) as T;

        if (!isCancelled) {
          setState({ data: json, loading: false, error: null });
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";

        if (!isCancelled) {
          setState({ data: null, loading: false, error: message });
        }
      }
    }

    run();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  return state;
}
