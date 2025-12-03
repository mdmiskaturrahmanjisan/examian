import api from "../libs/api";

const AuthService = {
  register: (data) => api.post("/register", data),
  login: (data) => api.post("/login", data),
  logout: () => api.post("/logout"),
  getProfile: () => api.get("/profile"),
};

export default AuthService;
