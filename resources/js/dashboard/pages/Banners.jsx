import React from 'react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import useBanner from "../../hooks/useBanner";
import Drawer from "../../components/ui/Drawer";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Table from "../../components/ui/Table";
import toast, { Toaster } from "react-hot-toast";
import { Plus } from "lucide-react";
import MediaPicker from "../../components/media/MediaPicker";

export default function Banners() {
  const {
    banners,
    fetchBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    attachMedia,
  } = useBanner();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      let banner;

      if (editing) {
        banner = await updateBanner(editing.id, data);
        toast.success("Banner updated");
      } else {
        banner = await createBanner(data);
        toast.success("Banner created");
      }

      if (selectedMedia) {
        await attachMedia(selectedMedia.id, banner.id);
      }

      reset();
      setDrawerOpen(false);
      setSelectedMedia(null);
      fetchBanners();

    } catch (err) {
      console.error(err);
      toast.error("Error saving banner");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this banner?")) return;
    await deleteBanner(id);
    fetchBanners();
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "type", label: "Type" },
    { key: "related_id", label: "Related ID" },
    {
      key: "media",
      label: "Image",
      render: (row) =>
        row.media?.length ? (
          <img
            src={row.media[0].original_url}
            className="h-12 w-12 rounded border object-cover"
          />
        ) : (
          "No image"
        ),
    },
    {
      key: "created_at",
      label: "Created",
      render: (row) => new Date(row.created_at).toLocaleString(),
    },
  ];

  return (
    <div>
      <Toaster />

      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Banners</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setSelectedMedia(null);
            reset();
            setDrawerOpen(true);
          }}
        >
          <Plus size={16} className="mr-1 mt-1" /> Add Banner
        </Button>
      </div>

      <Table
        columns={columns}
        data={banners}
        onEdit={(row) => {
          setEditing(row);
          setSelectedMedia(row.media?.[0] || null);
          reset(row);
          setDrawerOpen(true);
        }}
        onDelete={handleDelete}
      />

      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Banner">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input label="Type" {...register("type", { required: true })} />
          <Input label="Related ID" type="number" {...register("related_id")} />

          <Button type="button" className="mt-3 w-full" onClick={() => setMediaModal(true)}>
            Select Image
          </Button>

          {selectedMedia && (
            <img
              src={selectedMedia.original_url}
              className="h-20 mt-3 border rounded"
            />
          )}

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
