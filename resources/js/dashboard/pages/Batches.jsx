import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import useBatch from "../../hooks/useBatch";
import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import toast, { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import MediaPicker from "../../components/media/MediaPicker";

export default function Batches() {
  const {
    batches,
    fetchBatches,
    createBatch,
    updateBatch,
    deleteBatch,
    attachMedia,
  } = useBatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      let res;

      if (editing) {
        res = await updateBatch(editing.id, data);
        toast.success("Batch updated");
      } else {
        res = await createBatch(data);
        toast.success("Batch created");
      }

      const batch = res.data;

      if (selectedMedia) {
        await attachMedia({
          media_id: selectedMedia.id,
          mediable_id: batch.id,
          mediable_type: "App\\Models\\Batch",
        });
      }

      reset();
      setDrawerOpen(false);
      setSelectedMedia(null);
      fetchBatches();
    } catch {
      toast.error("Error saving batch");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this batch?")) return;
    await deleteBatch(id);
    fetchBatches();
  };

  const columns = [
    { key: "id", label: "ID" },
    {
      key: "media",
      label: "Image",
      render: (row) =>
        row.media?.length ? (
          <img
            src={row.media[0].original_url}
            className="h-12 w-12 rounded object-cover"
          />
        ) : (
          "No Image"
        ),
    },
    { key: "title", label: "Title" },
   
  ];

  return (
    <div>
      <Toaster />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Batches</h1>

        <Button
          onClick={() => {
            setEditing(null);
            setSelectedMedia(null);
            reset();
            setDrawerOpen(true);
          }}
        >
          <Plus className="mr-1" size={16} /> Add Batch
        </Button>
      </div>

      <Table
        columns={columns}
        data={batches}
        onEdit={(row) => {
          setEditing(row);
          setSelectedMedia(row.media?.[0] || null);
          reset(row);
          setDrawerOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Batch">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Title" {...register("title", { required: true })} />
          <Button
            type="button"
            className="w-full mt-3"
            onClick={() => setMediaModal(true)}
          >
            Select Image
          </Button>

          {selectedMedia && (
            <img
              src={selectedMedia.original_url}
              className="h-20 mt-3 rounded"
            />
          )}

          <Button type="submit" className="w-full mt-4">
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
