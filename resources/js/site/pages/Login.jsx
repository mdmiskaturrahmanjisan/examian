import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState("login");
  const navigate = useNavigate();
  const { login, register: registerUser } = useAuth();

  const { register, handleSubmit, reset } = useForm();

  const handleLogin = async (data) => {
    const ok = await login(data);
    if (ok) navigate("/");
  };

  const handleRegister = async (data) => {
    const ok = await registerUser(data);
    if (ok) navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <Toaster />
     
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${tab === "login" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 ${tab === "register" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
          onClick={() => setTab("register")}
        >
          Register
        </button>
      </div>

      {tab === "login" && (
        <form onSubmit={handleSubmit(handleLogin)}>
          <input
            {...register("phone", { required: true })}
            placeholder="Phone"
            className="w-full p-2 border rounded mb-3"
          />
          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
            className="w-full p-2 border rounded mb-3"
          />
          <button className="w-full bg-orange-600 text-white py-2 rounded">Login</button>
        </form>
      )}

      {tab === "register" && (
        <form onSubmit={handleSubmit(handleRegister)}>
          <input
            {...register("name", { required: true })}
            placeholder="Name"
            className="w-full p-2 border rounded mb-3"
          />

          <input
            {...register("phone", { required: true })}
            placeholder="Phone"
            className="w-full p-2 border rounded mb-3"
          />

          <select {...register("role")} className="w-full p-2 border rounded mb-3">
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <input
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
            className="w-full p-2 border rounded mb-3"
          />

          <button className="w-full bg-orange-600 text-white py-2 rounded">
            Register
          </button>
        </form>
      )}
    </div>
  );
}
