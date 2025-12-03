import api from "../libs/api";

const CategoryService = {
  getAll: () => api.get("/categories"),
  create: (data) => api.post("/categories", data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  remove: (id) => api.delete(`/categories/${id}`),
  attachMedia: (payload) => api.post("/media/attach", payload),
};

export default CategoryService;
