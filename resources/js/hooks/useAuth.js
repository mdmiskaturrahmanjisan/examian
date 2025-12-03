import api from "../libs/api";
import { useState, useEffect } from "react";
import AuthService from "../services/AuthService";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (payload) => {
    try {
      const res = await AuthService.login(payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Login successful");
      return true;
    } catch {
      toast.error("Invalid phone or password");
      return false;
    }
  };

  const register = async (payload) => {
    try {
      const res = await AuthService.register(payload);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Registration successful");
      return true;
    } catch {
      toast.error("Registration failed");
      return false;
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch {}
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [user]);

  return { user, login, register, logout, setUser };
};
