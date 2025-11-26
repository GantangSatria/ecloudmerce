"use client";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white bg-gradient-to-r from-zinc-900 to-zinc-700 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="font-bold text-lg">Ecloudmerce</div>
          <p className="mt-2 text-sm text-white">E-commerce sederhana untuk belajar dan prototipe.</p>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Navigasi</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/products" className="hover:underline">Product</Link>
            <Link href="/cart" className="hover:underline">Keranjang</Link>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Kontak</div>
          <div className="text-sm text-white">Temukan kami di kampus atau hubungi tim.</div>
        </div>
      </div>
      <div className="border-t border-x-amber-50">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-white flex items-center justify-between">
          <span>© {year} Ecloudmerce. All rights reserved.</span>
          <span>Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}