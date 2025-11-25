"use client";
import { useState } from "react";

export default function Toast({ message, onClose }) {
    useState(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-up">
      {message}
    </div>
  );
}
