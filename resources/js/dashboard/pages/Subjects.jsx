import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import MediaPicker from "../../components/media/MediaPicker";
import { useSubject } from "../../hooks/useSubject";

export default function Subjects() {
  const { subjects, saveSubject, removeSubject } = useSubject();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const saved = await saveSubject(data, editing, selectedMedia);
    if (saved) {
      setDrawerOpen(false);
      setSelectedMedia(null);
      setEditing(null);
      reset();
    }
  };

  const handleEdit = (row) => {
    setEditing(row);
    setSelectedMedia(row.media?.[0] || null);
    reset(row);
    setDrawerOpen(true);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
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
      key: "created_at",
      label: "Created Date",
      render: (row) =>
        row.created_at
          ? new Date(row.created_at).toLocaleString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",
    },
  ];

  return (
    <div>
      <Toaster />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setSelectedMedia(null);
            reset();
            setDrawerOpen(true);
          }}
        >
          <Plus className="inline mr-1" size={16} /> Add Subject
        </Button>
      </div>

      <Table columns={columns} data={subjects} onEdit={handleEdit} onDelete={removeSubject} />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Subject">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" {...register("title", { required: true })} />
          <Button type="button" className="mt-3 w-full" onClick={() => setMediaModal(true)}>
            Select Image
          </Button>
          {selectedMedia && <img src={selectedMedia.original_url} className="h-20 mt-3 border rounded" />}
          <Button type="submit" className="mt-4 w-full">
            {editing ? "Update" : "Create"}
          </Button>
        </form>
      </Drawer>

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
