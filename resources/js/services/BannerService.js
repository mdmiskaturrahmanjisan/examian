import api from "../libs/api";

const BannerService = {
  getAll() {
    return api.get("/banners");
  },

  create(data) {
    return api.post("/banners", data);
  },

  update(id, data) {
    return api.put(`/banners/${id}`, data);
  },

  delete(id) {
    return api.delete(`/banners/${id}`);
  },

  attachMedia(mediaId, bannerId) {
    return api.post("/media/attach", {
      media_id: mediaId,
      mediable_id: bannerId,
      mediable_type: "App\\Models\\Banner",
    });
  },
};

export default BannerService;
