import api from "../libs/api";

const TopicService = {
  getAll: () => api.get("/topics"),
  getSubjects: () => api.get("/subjects"), 
  create: (data) => api.post("/topics", data),
  update: (id, data) => api.put(`/topics/${id}`, data),
  remove: (id) => api.delete(`/topics/${id}`),
  attachMedia: (payload) => api.post("/media/attach", payload),
};

export default TopicService;
