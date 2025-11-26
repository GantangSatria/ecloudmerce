"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b-amber-600 bg-gradient-to-r from-zinc-900 to-zinc-700 text-white backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">Ecloudmerce</Link>
        <div className="flex gap-2">
          <Link href="/" className="px-3 py-2 rounded-2xl hover:bg-zinc-500">Home</Link>
          <Link href="/products" className="px-3 py-2 rounded-2xl hover:bg-zinc-500">Product</Link>
          <Link href="/cart" className="px-3 py-2 rounded-2xl hover:bg-zinc-500">Keranjang</Link>
        </div>
      </div>
    </nav>
  );
}