import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import CourseService from "../services/CourseService";

export const useCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const res = await CourseService.getAll();
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCourse = async (data, editing = null) => {
    try {
      let res;
      if (editing) {
        res = await CourseService.update(editing.id, data);
        toast.success("Course updated");
      } else {
        res = await CourseService.create(data);
        toast.success("Course created");
      }
      await fetchCourses();
      return res.data;
    } catch (err) {
      toast.error("Failed to save course");
      return null;
    }
  };

  const removeCourse = async (id) => {
    if (!confirm("Delete this course?")) return;
    try {
      await CourseService.remove(id);
      toast.success("Course deleted");
      await fetchCourses();
    } catch (err) {
      toast.error("Failed to delete course");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, fetchCourses, saveCourse, removeCourse };
};
