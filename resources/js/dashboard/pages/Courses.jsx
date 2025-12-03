import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import MediaPicker from "../../components/media/MediaPicker";

import { Plus } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { useCourse } from "../../hooks/useCourse";
import { useCategory } from "../../hooks/useCategory";
import useBatch from "../../hooks/useBatch";
import { useExam } from "../../hooks/useExam";
import { useAuth } from "../../hooks/useAuth";

export default function Courses() {
  const { courses, saveCourse, removeCourse } = useCourse();
  const { categories } = useCategory();
  const { batches } = useBatch();
  const { exams } = useExam();
  const { user } = useAuth();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    reset({ user_id: user?.id });
  }, [user]);

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      new_price: Number(data.new_price),
      old_price: Number(data.old_price),
      category_id: Number(data.category_id),
      batch_id: Number(data.batch_id),
      exam_id: Number(data.exam_id),
      user_id: user?.id,
    };

    const saved = await saveCourse(payload, editing, selectedMedia);

    if (saved) {
      setDrawerOpen(false);
      setSelectedMedia(null);
      setEditing(null);
      reset({ user_id: user?.id });
    }
  };

  const handleEdit = (row) => {
    setEditing(row);

    reset({
      title: row.title,
      details: row.details,
      type: row.type,
      new_price: row.new_price,
      old_price: row.old_price,
      category_id: row.category_id,
      batch_id: row.batch_id,
      exam_id: row.exam_id,
      status: row.status,
      user_id: row.user_id,
    });

    setSelectedMedia(row.media?.[0] || null);
    setDrawerOpen(true);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "type", label: "Type" },
    {
      key: "media",
      label: "Image",
      render: (row) =>
        row.media?.length ? (
          <img
            src={row.media[0].original_url}
            alt={row.title}
            className="h-12 w-12 object-cover rounded border"
          />
        ) : (
          <span className="text-gray-400">No image</span>
        ),
    },
    {
      key: "new_price",
      label: "Price",
      render: (row) => `${row.new_price} Taka (Old: ${row.old_price} Taka)`,
    },
    {
      key: "created_at",
      label: "Created",
      render: (row) =>
        row.created_at
          ? new Date(row.created_at).toLocaleString("en-US")
          : "-",
    },
  ];

  return (
    <div>
      <Toaster />

      {/* Header */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Courses</h1>

        <Button
          onClick={() => {
            setEditing(null);
            setSelectedMedia(null);
            reset({ user_id: user?.id });
            setDrawerOpen(true);
          }}
        >
          <Plus className="inline mr-1" size={16} /> Add Course
        </Button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={courses}
        onEdit={handleEdit}
        onDelete={removeCourse}
      />

      {/* Drawer Form */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Course">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" {...register("title", { required: true })} />
          <Input label="Details" {...register("details", { required: true })} />

          {/* TYPE */}
          <label className="mt-3 block">Course Type</label>
          <select
            {...register("type", { required: true })}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Type</option>
            <option value="admission">Admission</option>
            <option value="job">Job</option>
          </select>

          <Input label="New Price" type="number" {...register("new_price")} />
          <Input label="Old Price" type="number" {...register("old_price")} />

          {/* CATEGORY */}
          <label className="mt-3 block">Category</label>
          <select
            {...register("category_id")}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          {/* BATCH */}
          <label className="mt-3 block">Batch</label>
          <select
            {...register("batch_id")}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Batch</option>
            {batches?.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>

          {/* EXAM */}
          <label className="mt-3 block">Exam</label>
          <select
            {...register("exam_id")}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Exam</option>
            {exams?.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <Input label="Status" type="number" {...register("status")} />

          {/* MEDIA PICKER */}
          <Button
            type="button"
            className="mt-3 w-full"
            onClick={() => setMediaModal(true)}
          >
            Select Image
          </Button>

          {selectedMedia && (
            <img
              src={selectedMedia.original_url}
              className="h-20 mt-3 border rounded"
            />
          )}

          <Button type="submit" className="mt-4 w-full">
            {editing ? "Update Course" : "Create Course"}
          </Button>
        </form>
      </Drawer>

      {/* Media Picker */}
      <MediaPicker
        open={mediaModal}
        onClose={() => setMediaModal(false)}
        onSelect={(img) => {
          setSelectedMedia(img);
          setMediaModal(false);
        }}
      />
    </div>
  );
}
