import { useEffect, useState } from "react";
import BatchService from "../services/BatchService";

export default function useBatch() {
  const [batches, setBatches] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchBatches = async () => {
    const res = await BatchService.getAll();
    setBatches(res.data);
  };

  const fetchCategories = async () => {
    const res = await BatchService.getCategories();
    setCategories(res.data);
  };

  const createBatch = (data) => BatchService.create(data);

  const updateBatch = (id, data) => BatchService.update(id, data);

  const deleteBatch = (id) => BatchService.remove(id);

  const attachMedia = (payload) => BatchService.attachMedia(payload);

  useEffect(() => {
    (async () => {
      await fetchBatches();
      await fetchCategories();
    })();
  }, []);

  return {
    batches,
    categories,
    fetchBatches,
    createBatch,
    updateBatch,
    deleteBatch,
    attachMedia,
  };
}
