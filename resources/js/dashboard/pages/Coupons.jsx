import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import CouponService from "../../services/CouponService";
import { useCoupon } from "../../hooks/useCoupon";

export default function Coupons() {
  const { coupons, fetchCoupons, loading } = useCoupon();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await CouponService.update(editing.id, data);
        toast.success("Coupon updated");
      } else {
        await CouponService.create(data);
        toast.success("Coupon created");
      }
      reset();
      setDrawerOpen(false);
      setEditing(null);
      fetchCoupons();
    } catch  {
      toast.error("Error saving coupon");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this coupon?")) return;
    try {
      await CouponService.remove(id);
      toast.success("Coupon deleted");
      fetchCoupons();
    } catch  {
      toast.error("Error deleting coupon");
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "code", label: "Code" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    { key: "amount", label: "Amount", render: (row) => `$${row.amount}` },
    {
      key: "created_at",
      label: "Created At",
      render: (row) =>
        row.created_at
          ? new Date(row.created_at).toLocaleString()
          : "-",
    },
  ];

  return (
    <div>
      <Toaster />
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <Button
          onClick={() => {
            reset();
            setEditing(null);
            setDrawerOpen(true);
          }}
        >
          Add Coupon
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : (
        <Table
          columns={columns}
          data={coupons}
          onEdit={(row) => {
            setEditing(row);
            reset(row);
            setDrawerOpen(true);
          }}
          onDelete={handleDelete}
        />
      )}

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title={editing ? "Edit Coupon" : "Add Coupon"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input label="Code" {...register("code", { required: true })} />
          <Input label="Title" {...register("title", { required: true })} />
          <label className="block text-sm font-medium">Type</label>
          <select
            {...register("type", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
          </select>
          <Input
            label="Amount"
            type="number"
            step="0.01"
            {...register("amount", { required: true, min: 0 })}
          />
          <Button type="submit" className="w-full mt-3">
            {editing ? "Update" : "Create"}
          </Button>
        </form>
      </Drawer>
    </div>
  );
}
