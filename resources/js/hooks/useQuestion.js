import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import QuestionService from "../services/QuestionService";

export const useQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await QuestionService.getAll(params);
      setQuestions(res.data.data ?? res.data);
    } catch {
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveQuestion = async (data, editing = null) => {
    try {
      let res;
      if (editing) {
        res = await QuestionService.update(editing.id, data);
        toast.success("Question updated");
      } else {
        res = await QuestionService.create(data);
        toast.success("Question created");
      }
      await fetchQuestions();
      return res.data;
    } catch (err) {
      toast.error("Error saving question");
      return null;
    }
  };

  const removeQuestion = async (id) => {
    if (!confirm("Delete this question?")) return;
    try {
      await QuestionService.remove(id);
      toast.success("Question deleted");
      await fetchQuestions();
    } catch {
      toast.error("Error deleting question");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return { questions, loading, fetchQuestions, saveQuestion, removeQuestion };
};
