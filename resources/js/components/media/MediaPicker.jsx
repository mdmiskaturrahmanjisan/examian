import React from 'react';
import { useEffect, useState } from "react";
import Drawer from "../ui/Drawer";
import axiosClient from "../../api/axiosClient";

export default function MediaPicker({ open, onClose, onSelect }) {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    if (open) {
      axiosClient.get("/media").then((res) => setMediaList(res.data));
    }
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={onClose} title="Select Image">
      <div className="grid grid-cols-3 gap-3 p-3">
        {mediaList.map((item) => (
          <div
            key={item.id}
            className="border rounded cursor-pointer hover:shadow p-1"
            onClick={() => onSelect(item)}
          >
            <img
              src={item.original_url}
              className="h-24 w-full object-cover rounded"
            />
          </div>
        ))}
      </div>
    </Drawer>
  );
}
