import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import ExamService from "../services/ExamService";

export const useExam = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchExams = useCallback(async () => {
    setLoading(true);
    try {
      const res = await ExamService.getAll();
      setExams(res.data);
    } catch (err) {
      toast.error("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveExam = async (data, editing = null) => {
    try {
      let res;
      if (editing) {
        res = await ExamService.update(editing.id, data);
        toast.success("Exam updated");
      } else {
        res = await ExamService.create(data);
        toast.success("Exam created");
      }
      await fetchExams();
      return res.data;
    } catch (err) {
      toast.error("Error saving exam");
      return null;
    }
  };

  const removeExam = async (id) => {
    if (!confirm("Delete this exam?")) return;
    try {
      await ExamService.remove(id);
      toast.success("Exam deleted");
      await fetchExams();
    } catch {
      toast.error("Error deleting exam");
    }
  };

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return { exams, loading, fetchExams, saveExam, removeExam };
};
