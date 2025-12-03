import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import SubjectService from "../services/SubjectService";

export const useSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await SubjectService.getAll();
      setSubjects(res.data);
    } catch {
      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveSubject = async (data, editing = null, selectedMedia = null) => {
    try {
      let res;
      if (editing) {
        res = await SubjectService.update(editing.id, data);
        toast.success("Subject updated");
      } else {
        res = await SubjectService.create(data);
        toast.success("Subject created");
      }

      const subject = res.data;

      if (selectedMedia) {
        await SubjectService.attachMedia({
          media_id: selectedMedia.id,
          mediable_id: subject.id,
          mediable_type: "App\\Models\\Subject",
        });
      }

      await fetchSubjects();
      return subject;
    } catch {
      toast.error("Error saving subject");
      return null;
    }
  };

  const removeSubject = async (id) => {
    if (!confirm("Delete this subject?")) return;
    try {
      await SubjectService.remove(id);
      toast.success("Subject deleted");
      await fetchSubjects();
    } catch {
      toast.error("Error deleting subject");
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  return { subjects, loading, fetchSubjects, saveSubject, removeSubject };
};
