import api from "../libs/api";

const MediaService = {
  getAll: () => api.get("/media"),
  upload: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/media", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default MediaService;
