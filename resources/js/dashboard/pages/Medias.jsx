import React from 'react';
import { useState } from "react";
import Button from "../../components/ui/Button";
import { useMedia } from "../../hooks/useMedia";

export default function Media() {
  const { mediaList, uploadMedia, loading } = useMedia();
  const [file, setFile] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Media Library</h1>
      <div className="flex gap-3">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button onClick={() => uploadMedia(file)} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {mediaList.map((m) => (
          <img
            key={m.id}
            src={m.original_url}
            className="h-32 w-full object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
}
