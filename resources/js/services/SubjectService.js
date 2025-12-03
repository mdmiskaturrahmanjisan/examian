import api from "../libs/api";

const SubjectService = {
  getAll: () => api.get("/subjects"),
  create: (data) => api.post("/subjects", data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  remove: (id) => api.delete(`/subjects/${id}`),
  attachMedia: (payload) => api.post("/media/attach", payload),
};

export default SubjectService;
