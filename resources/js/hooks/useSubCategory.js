import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import SubCategoryService from "../services/SubCategoryService";

export const useSubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [subRes, catRes] = await Promise.all([
        SubCategoryService.getAll(),
        SubCategoryService.getCategories(),
      ]);
      setSubCategories(subRes.data);
      setCategories(catRes.data);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSubCategory = async (data, editing = null, selectedMedia = null) => {
    try {
      let res;
      if (editing) {
        res = await SubCategoryService.update(editing.id, data);
        toast.success("Updated");
      } else {
        res = await SubCategoryService.create(data);
        toast.success("Created");
      }

      const sub = res.data;

      if (selectedMedia) {
        await SubCategoryService.attachMedia({
          media_id: selectedMedia.id,
          mediable_id: sub.id,
          mediable_type: "App\\Models\\SubCategory",
        });
      }

      await fetchAll();
      return sub;
    } catch {
      toast.error("Error saving sub-category");
      return null;
    }
  };

  const removeSubCategory = async (id) => {
    if (!confirm("Delete this?")) return;
    try {
      await SubCategoryService.remove(id);
      toast.success("Deleted");
      await fetchAll();
    } catch {
      toast.error("Error deleting");
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    subCategories,
    categories,
    loading,
    fetchAll,
    saveSubCategory,
    removeSubCategory,
  };
};
