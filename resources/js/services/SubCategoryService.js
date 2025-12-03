import api from "../libs/api";

const SubCategoryService = {
  getAll: () => api.get("/sub-categories"),
  getCategories: () => api.get("/categories"), // For parent dropdown
  create: (data) => api.post("/sub-categories", data),
  update: (id, data) => api.put(`/sub-categories/${id}`, data),
  remove: (id) => api.delete(`/sub-categories/${id}`),
  attachMedia: (payload) => api.post("/media/attach", payload),
};

export default SubCategoryService;
