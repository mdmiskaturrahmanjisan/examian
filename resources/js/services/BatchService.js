import api from "../libs/api";

const BatchService = {
  getAll: () => api.get("/batches"),

  getCategories: () => api.get("/categories"),

  create: (data) => api.post("/batches", data),

  update: (id, data) => api.put(`/batches/${id}`, data),

  remove: (id) => api.delete(`/batches/${id}`),

  attachMedia: (payload) => api.post("/media/attach", payload),
};

export default BatchService;
