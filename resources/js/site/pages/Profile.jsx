import React from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../../hooks/useProfile";
import { useAuth } from "../../hooks/useAuth";
import { Toaster } from "react-hot-toast";

export default function Profile() {
  const { user, setUser } = useAuth();
  const { updateProfile } = useProfile();
  const { register, handleSubmit } = useForm({ defaultValues: user });

  const onSubmit = async (data) => {
    const res = await updateProfile(data);
    if (res) {
      localStorage.setItem("user", JSON.stringify(res));
      setUser(res);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <Toaster />
      <h2 className="text-xl mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} placeholder="Name" className="w-full p-2 border rounded mb-3" />

        <input {...register("phone")} placeholder="Phone" className="w-full p-2 border rounded mb-3" />

        <input {...register("email")} placeholder="Email" className="w-full p-2 border rounded mb-3" />

        <input {...register("address")} placeholder="Address" className="w-full p-2 border rounded mb-3" />

        <select {...register("gender")} className="w-full p-2 border rounded mb-3">
          <option value="">Select gender</option>
          <option>male</option>
          <option>female</option>
          <option>other</option>
        </select>

        <button className="w-full bg-orange-600 text-white py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
