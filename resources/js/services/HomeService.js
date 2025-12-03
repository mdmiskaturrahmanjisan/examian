import api from "../libs/api";

const HomeService = {
  getBanners: () => api.get("/banners"),
  getCategories: () => api.get("/categories"),
  getServices: () => api.get("/services"),
};

export default HomeService;
