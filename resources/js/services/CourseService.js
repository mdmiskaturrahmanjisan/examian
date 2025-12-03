import api from "../libs/api";

const CourseService = {
  getAll: () => api.get("courses"),

  get: (id) => api.get(`courses/${id}`),

  create: (data) => api.post("courses", data),

  update: (id, data) => api.put(`courses/${id}`, data),

  remove: (id) => api.delete(`courses/${id}`),
};

export default CourseService;
