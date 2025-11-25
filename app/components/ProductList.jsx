"use client";

export default function ProductList({ products, onEdit, onDelete, onAddToCart }) {
  if (products.length === 0) {
    return <p className="text-zinc-600">Belum ada produk.</p>;
  }

  return (
    <div className="space-y-3">
      {products.map((p) => (
        <div
          key={p.id}
          className="rounded-lg border bg-zinc-50 p-4 hover:shadow-md transition"
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="h-24 w-24 overflow-hidden rounded-lg border bg-zinc-100">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-black">
                  Rp {p.price.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          {p.desc && <p className="text-sm text-black mb-3">{p.desc}</p>}
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart(p)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm hover:bg-green-700 transition"
            >
              + Keranjang
            </button>
            <button
              onClick={() => onEdit(p)}
              className="px-3 py-1.5 rounded-lg border text-sm border-blue-400 text-blue-600 hover:bg-blue-300 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(p.id)}
              className="px-3 py-1.5 rounded-lg border border-red-300 text-red-600 text-sm hover:bg-red-300 transition"
            >
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}