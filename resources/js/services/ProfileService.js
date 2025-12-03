import api from "../libs/api";

const ProfileService = {
  updateProfile: (data) => api.post("/profile", data),
  changePassword: (data) => api.post("/change-password", data),
};

export default ProfileService;
