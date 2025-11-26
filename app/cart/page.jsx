"use client";
import { useApp } from "@/lib/AppContext";

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartQty, clearCart } = useApp();
  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Keranjang</h1>
      {cartItems.length === 0 ? (
        <p className="text-zinc-600">Keranjang kosong.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((i) => (
            <div key={i.id} className="flex items-center justify-between rounded-xl border bg-[#f1f5f9] p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-lg border bg-zinc-100">
                  {i.image ? (
                    <img src={i.image} alt={i.name} className="h-full w-full object-cover" />
                  ) : null}
                </div>
                <div>
                  <div className="font-medium">{i.name}</div>
                  <div className="text-sm text-zinc-600">Rp {i.price.toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={i.qty}
                  onChange={(e) => updateCartQty(i.id, Number(e.target.value))}
                  className="w-20 rounded-lg border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-black/50"
                />
                <button
                  onClick={() => removeFromCart(i.id)}
                  className="px-3 py-1 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
            <div className="font-semibold">Total: Rp {total.toLocaleString()}</div>
            <button onClick={clearCart} className="px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 transition">
              Bersihkan
            </button>
          </div>
        </div>
      )}
    </main>
  );
}