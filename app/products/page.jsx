"use client";
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { useApp } from "@/lib/AppContext";
import Toast from "../components/Toast";

export default function ProductsPage() {
  const { products, addProduct, updateProduct, deleteProduct, addToCart } = useApp();
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  function handleCreate(data) {
    addProduct(data);
    setToast("Produk berhasil ditambahkan!");
  }

  function handleUpdate(data) {
    updateProduct(editing.id, data);
    setEditing(null);
    setToast("Produk berhasil diupdate!");
  }

  function handleDelete(id) {
    deleteProduct(id);
    if (editing?.id === id) setEditing(null);
    setToast("Produk berhasil dihapus!");
  }

  function handleAddToCart(product) {
    addToCart(product, 1);
    setToast(`${product.name} ditambahkan ke keranjang!`);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-3">Produk</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="rounded-xl border bg-[#f1f5f9] p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            {editing ? "Edit Produk" : "Tambah Produk"}
          </h2>
          <ProductForm onSubmit={editing ? handleUpdate : handleCreate} initial={editing} />
          {editing && (
            <button
              onClick={() => setEditing(null)}
              className="mt-3 w-full rounded-lg border px-4 py-2 hover:bg-zinc-50 transition"
            >
              Batal Edit
            </button>
          )}
        </section>
        <section className="rounded-xl border bg-[#f1f5f9] p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Daftar Produk</h2>
          <ProductList
            products={products}
            onEdit={setEditing}
            onDelete={handleDelete}
            onAddToCart={handleAddToCart}
          />
        </section>
      </div>
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </main>
  );
}