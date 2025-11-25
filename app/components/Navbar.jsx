"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">Ecloudmerce</Link>
        <div className="flex gap-2">
          <Link href="/" className="px-3 py-2 rounded hover:bg-zinc-100">Home</Link>
          <Link href="/products" className="px-3 py-2 rounded hover:bg-zinc-100">Product</Link>
          <Link href="/cart" className="px-3 py-2 rounded hover:bg-zinc-100">Keranjang</Link>
        </div>
      </div>
    </nav>
  );
}