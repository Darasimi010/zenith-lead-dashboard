import { useState, useEffect, useCallback } from "react";
import { data, type Lead } from "../data/data";

interface UseLeadsReturn {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  simulateError: () => void;
}

export function useLeads(): UseLeadsReturn {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forceError, setForceError] = useState(false);

  const fetchLeads = useCallback(() => {
    setLoading(true);
    setError(null);

    // Simulate an API call with a 1.5s delay
    const timer = setTimeout(() => {
      if (forceError) {
        setError(
          "Failed to fetch leads from the server. The API returned a 500 Internal Server Error. Please try again or contact support.",
        );
        setLoading(false);
        setForceError(false);
        return;
      }
      setLeads(data);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [forceError]);

  useEffect(() => {
    const cleanup = fetchLeads();
    return cleanup;
  }, [fetchLeads]);

  const refetch = useCallback(() => {
    setForceError(false);
    setLoading(true);
    setError(null);
    const timer = setTimeout(() => {
      setLeads(data);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const simulateError = useCallback(() => {
    setForceError(true);
  }, []);

  return { leads, loading, error, refetch, simulateError };
}
