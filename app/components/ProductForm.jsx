"use client";
import { useEffect, useState } from "react";

export default function ProductForm({ onSubmit, initial }) {
  const [name, setName] = useState(initial?.name || "");
  const [price, setPrice] = useState(initial?.price || "");
  const [desc, setDesc] = useState(initial?.desc || "");
  const [image, setImage] = useState(initial?.image || "");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!name || !price) return;
    onSubmit({ name, price: Number(price), desc, image });
    setName("");
    setPrice("");
    setDesc("");
    setImage("");
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Gambar Produk</label>
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 overflow-hidden rounded-lg border bg-zinc-100">
            {image ? (
              <img src={image} alt="preview" className="h-full w-full object-cover" />
            ) : null}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nama Produk</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Harga</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Deskripsi</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/50"
          rows="3"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full rounded-lg bg-black text-white px-4 py-2 hover:bg-zinc-800 transition"
      >
        {initial ? "Update" : "Tambah"}
      </button>
    </div>
  );
}