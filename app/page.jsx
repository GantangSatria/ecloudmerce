import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-700 text-white px-8 py-16 shadow-lg">
        <h1 className="text-5xl font-bold tracking-tight">Ecloudmerce</h1>
        <p className="mt-4 text-zinc-200">Belanja mudah dan kelola produk secara sederhana.</p>
        <div className="mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-black hover:bg-zinc-200 transition">Mulai Kelola Produk</Link>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="font-semibold">Produk</div>
          <div className="text-sm text-zinc-600">Tambah, edit, dan hapus produk.</div>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition">
          <div className="font-semibold">Keranjang</div>
          <div className="text-sm text-zinc-600">Simpan barang yang ingin dibeli.</div>
        </div>
      </section>
    </main>
  );
}
