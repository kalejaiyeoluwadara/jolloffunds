"use client";
import React from "react";
import { images } from "@/app/utils";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa"; // React Icon for Success
import { FiCopy } from "react-icons/fi"; // React Icon for Copy Link
import Link from "next/link";
export default function SuccessPage() {
  const username = "your_username"; // Replace dynamically with the actual username

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://jolloffunds/${username}`);
    alert("Link don copy! Share am sharp sharp 🎉");
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-6 relative">
      {/* Success Message */}
      <div className="bg-green-100 relative z-50 bg-opacity-20 backdrop-blur-md border border-green-300 border-opacity-50 rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-200 text-6xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-green-300 mb-2">
          Profile Don Set! 🎉
        </h1>
        <p className="text-white mb-4">
          "Na beta work you do so! Jollof go flow well well. Share your link
          make dem spread di love."
        </p>

        {/* Shareable Link */}
        <div className="bg-green-200 p-4 rounded-lg shadow-md flex items-center justify-between mb-4">
          <button>
            <Link
              href={`/jolloffunds/${username}`}
              className="text-blue-500 underline font-medium truncate"
            >
              jolloffunds/{username}
            </Link>
          </button>
          <button
            onClick={copyToClipboard}
            className="bg-green-500 rounded-md p-2  transition duration-300"
          >
            <FiCopy className="text-xl" />
          </button>
        </div>

        {/* CTA Button */}
        <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300">
          Back to Home
        </button>
      </div>

      {/* Background Image */}
      <Image
        className="absolute  h-full w-full object-cover top-0 left-0 z-10"
        src={images.aza2}
        alt=""
      />
    </div>
  );
}
