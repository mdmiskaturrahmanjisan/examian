import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import TopicService from "../services/TopicService";

export const useTopic = () => {
  const [topics, setTopics] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [topicsRes, subjectsRes] = await Promise.all([
        TopicService.getAll(),
        TopicService.getSubjects(),
      ]);
      setTopics(topicsRes.data);
      setSubjects(subjectsRes.data);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  const saveTopic = async (data, editing = null, selectedMedia = null) => {
    try {
      let res;
      if (editing) {
        res = await TopicService.update(editing.id, data);
        toast.success("Updated");
      } else {
        res = await TopicService.create(data);
        toast.success("Created");
      }

      const topic = res.data;

      if (selectedMedia) {
        await TopicService.attachMedia({
          media_id: selectedMedia.id,
          mediable_id: topic.id,
          mediable_type: "App\\Models\\Topic",
        });
      }

      await fetchAll();
      return topic;
    } catch (err) {
      console.error(err);
      toast.error("Error saving topic");
      return null;
    }
  };

  const removeTopic = async (id) => {
    if (!confirm("Delete this?")) return;
    try {
      await TopicService.remove(id);
      toast.success("Deleted");
      await fetchAll();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting topic");
    }
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    topics,
    subjects,
    loading,
    fetchAll,
    saveTopic,
    removeTopic,
  };
};
