import api from "../libs/api";

const QuestionService = {
  getAll: (params = {}) => api.get("/questions", { params }), // supports filters via params
  get: (id) => api.get(`/questions/${id}`),
  create: (data) => api.post("/questions", data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  remove: (id) => api.delete(`/questions/${id}`),
};

export default QuestionService;
