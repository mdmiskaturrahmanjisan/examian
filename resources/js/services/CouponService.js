import api from "../libs/api";

const CouponService = {
  getAll: () => api.get("/coupons"),
  create: (data) => api.post("/coupons", data),
  update: (id, data) => api.put(`/coupons/${id}`, data),
  remove: (id) => api.delete(`/coupons/${id}`),
};

export default CouponService;
