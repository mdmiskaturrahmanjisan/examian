import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import DashboardService from "../services/DashboardService";

export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await DashboardService.getStats();
      setStats(res.data);
    } catch {
      toast.error("Failed to load dashboard stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, fetchStats };
};
