"use client";
import React from "react";
import { FaHeart, FaSmileWink } from "react-icons/fa";
import { FaHandsClapping } from "react-icons/fa6";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { images } from "@/app/utils"; // Adjust import based on your project structure

export default function CelebrationPage() {
  const handleShareLove = () => {
    toast("You na real MVP! Blessings dey follow you! 🌟", {
      icon: "🎉",
    });
  };

  return (
    <div className="h-screen w-screen bg-white  text-white flex flex-col items-center justify-center p-6 relative">
      <Toaster position="top-center" />

      {/* Celebration Card */}
      <div className="w-full h-full text-center">
        <div className="flex flex-col items-center gap-3 mb-4">
          <Image
            src={images.twale} // Replace with your celebratory background image
            alt="Celebration Background"
            className="object-cover rounded-md"
          />
          <h1 className="text-3xl mt-4 font-bold text-black">
            Twale! Funds Don Land!
          </h1>
        </div>
        <p className="text-gray-800 font-medium mb-4">
          "Oga! You just run levels, blessings go land back to you double! 🙌"
        </p>
        {/* Share Love Button */}
        <button
          onClick={handleShareLove}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300 flex items-center justify-center gap-2"
        >
          Spread More Love ❤️
        </button>
      </div>
      <footer className=" text-gray-400 fixed bottom-4 text-center py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dara. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
