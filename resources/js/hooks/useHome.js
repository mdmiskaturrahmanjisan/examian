import { useState, useEffect, useCallback } from "react";
import HomeService from "../services/HomeService";
import toast from "react-hot-toast";

export function useHome() {
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const [bannerRes, catRes, batchRes] = await Promise.all([
        HomeService.getBanners(),
        HomeService.getCategories(),
        HomeService.getBatches(),
      ]);
      setBanners(bannerRes.data);
      setCategories(catRes.data);
      setBatches(batchRes.data);
    } catch {
      toast.error("Failed to load home data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  return { banners, categories, batches, loading, reload: loadHomeData };
}
