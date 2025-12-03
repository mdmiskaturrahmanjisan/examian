import { useState } from "react";
import ProfileService from "../services/ProfileService";
import toast from "react-hot-toast";

export const useProfile = () => {
  const updateProfile = async (data) => {
    try {
      const res = await ProfileService.updateProfile(data);
      toast.success("Profile updated");
      return res.data;
    } catch {
      toast.error("Profile update failed");
      return false;
    }
  };

  const changePassword = async (data) => {
    try {
      await ProfileService.changePassword(data);
      toast.success("Password changed successfully");
      return true;
    } catch {
      toast.error("Password update failed");
      return false;
    }
  };

  return { updateProfile, changePassword };
};
