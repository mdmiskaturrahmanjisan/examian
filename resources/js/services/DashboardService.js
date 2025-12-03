import api from "../libs/api";

const DashboardService = {
  getStats: () => api.get("/dashboard"),
};

export default DashboardService;
