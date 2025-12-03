import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import CategoryService from "../services/CategoryService";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CategoryService.getAll();
      setCategories(res.data);
    } catch {
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCategory = async (data, editing = null, selectedMedia = null) => {
    try {
      let res;
      if (editing) {
        res = await CategoryService.update(editing.id, data);
        toast.success("Category updated");
      } else {
        res = await CategoryService.create(data);
        toast.success("Category created");
      }

      const category = res.data;

      if (selectedMedia) {
        await CategoryService.attachMedia({
          media_id: selectedMedia.id,
          mediable_id: category.id,
          mediable_type: "App\\Models\\Category",
        });
      }

      await fetchCategories();
      return category;
    } catch {
      toast.error("Error saving category");
      return null;
    }
  };

  const removeCategory = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await CategoryService.remove(id);
      toast.success("Category deleted");
      await fetchCategories();
    } catch {
      toast.error("Error deleting category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, fetchCategories, saveCategory, removeCategory };
};
