import api from "../libs/api";

const UserExamService = {
  start: (examId) => api.post(`/exams/${examId}/start`),

  resume: (userExamId) =>
    api.get(`/user-exams/${userExamId}/resume`),

  saveAnswer: (data) =>
    api.post("/user-exams/save-answer", data),

  submit: (userExamId) =>
    api.post(`/user-exams/${userExamId}/submit`),
};

export default UserExamService;
