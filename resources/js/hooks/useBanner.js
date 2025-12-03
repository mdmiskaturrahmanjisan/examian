import { useEffect, useState } from "react";
import BannerService from "../services/BannerService";

export default function useBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    const res = await BannerService.getAll();
    setBanners(res.data);
    setLoading(false);
  };

  const createBanner = async (data) => {
    const res = await BannerService.create(data);
    return res.data;
  };

  const updateBanner = async (id, data) => {
    const res = await BannerService.update(id, data);
    return res.data;
  };

  const deleteBanner = async (id) => {
    await BannerService.delete(id);
  };

  const attachMedia = (mediaId, bannerId) => {
    return BannerService.attachMedia(mediaId, bannerId);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await BannerService.getAll();
      setBanners(res.data);
      setLoading(false);
    })();
  }, []);

  return {
    banners,
    loading,
    fetchBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    attachMedia,
  };
}
