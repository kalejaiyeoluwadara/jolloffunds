"use client";

import React from "react";
import { images } from "@/app/utils";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function SuccessPage() {
  const username = "your_username"; // Replace dynamically with the actual username

  const copyToClipboard = () => {
    const link = `https://jolloffunds.vercel.app/${username}`;
    navigator.clipboard.writeText(link);
    toast.success("Copied Link! start sharing🎉", {
      icon: "🔥",
      style: {
        borderRadius: "8px",
        background: "#22c55e",
        color: "#fff",
      },
    });
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6 relative">
      <Toaster position="top-center" />

      {/* Success Message */}
      <div className="bg-green-100 relative z-50 bg-opacity-20 backdrop-blur-md border border-green-300 border-opacity-50 rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-300 mb-2">
          Profile Don Set! 🎉
        </h1>
        <p className="text-white mb-4">
          "Na beta work you do so! Jollof go flow well well. Share your link
          make dem spread di love."
        </p>

        {/* Shareable Link */}
        <div className="bg-green-100 text-black p-4 rounded-lg shadow-md flex items-center justify-between gap-3 mb-4">
          <p className="text-lg truncate">
            <Link
              href={`https://jolloffunds.vercel.app/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              jolloffunds/{username}
            </Link>
          </p>
          <button
            onClick={copyToClipboard}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md transition duration-300 flex items-center gap-1"
          >
            <FiCopy className="text-lg" />
            <span className="hidden sm:inline">Copy</span>
          </button>
        </div>
      </div>

      {/* Background Image */}
      <Image
        className="absolute h-full w-full object-cover top-0 left-0 z-10 opacity-50"
        src={images.aza2}
        alt=""
      />
    </div>
  );
}
