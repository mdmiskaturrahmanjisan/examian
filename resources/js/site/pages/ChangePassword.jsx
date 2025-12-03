import React from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../../hooks/useProfile";
import { Toaster } from "react-hot-toast";

export default function ChangePassword() {
  const { changePassword } = useProfile();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await changePassword(data);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded">
      <Toaster />
      <h2 className="text-xl mb-4">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("current_password", { required: true })}
          type="password"
          placeholder="Current Password"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          {...register("new_password", { required: true })}
          type="password"
          placeholder="New Password"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          {...register("new_password_confirmation", { required: true })}
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-2 border rounded mb-4"
        />

        <button className="w-full bg-orange-600 text-white py-2 rounded">
          Update Password
        </button>
      </form>
    </div>
  );
}
