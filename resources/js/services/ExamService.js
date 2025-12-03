import api from "../libs/api";

const ExamService = {
  getAll: (params = {}) => api.get("/exams", { params }),
  get: (id) => api.get(`/exams/${id}`),
  create: (data) => api.post("/exams", data),
  update: (id, data) => api.put(`/exams/${id}`, data),
  remove: (id) => api.delete(`/exams/${id}`),

  // exam process endpoints
  start: (examId, payload = {}) => api.post(`/exams/${examId}/start`, payload),
  resume: (userExamId) => api.get(`/user-exams/${userExamId}/resume`),
  saveAnswer: (payload) => api.post("/user-exams/save-answer", payload),
  submit: (userExamId) => api.post(`/user-exams/${userExamId}/submit`),
};

export default ExamService;
