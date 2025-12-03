import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import MediaService from "../services/MediaService";

export const useMedia = () => {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const res = await MediaService.getAll();
      setMediaList(res.data);
    } catch {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadMedia = async (file) => {
    if (!file) return toast.error("Please select a file");
    try {
      await MediaService.upload(file);
      toast.success("Uploaded successfully");
      await fetchMedia();
    } catch {
      toast.error("Upload failed");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return { mediaList, loading, fetchMedia, uploadMedia };
};
