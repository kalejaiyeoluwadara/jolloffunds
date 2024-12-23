"use client";
import React from "react";
import { images } from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen text-white flex flex-col items-center justify-center p-6 relative">
      {/* Glassmorphic Container */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-30 relative z-50 text-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Create Your Profile
        </h1>
        <p className="text-sm text-center mb-6">
          "Abeg drop your details make we dey spread di love."
        </p>

        {/* Username Input */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Your Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder="@your_username"
              className="w-full bg-gray-100 text-gray-800 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Bank Name Input */}
        <div className="mb-4">
          <label htmlFor="bank" className="block text-sm font-medium mb-2">
            Bank Name
          </label>
          <input
            type="text"
            id="bank"
            placeholder="E.g., Access Bank"
            className="w-full bg-gray-100 text-gray-800 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Account Number Input */}
        <div className="mb-6">
          <label htmlFor="account" className="block text-sm font-medium mb-2">
            Account Number
          </label>
          <input
            type="text"
            id="account"
            placeholder="1234567890"
            className="w-full bg-gray-100 text-gray-800 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={() => {
            router.push("/share");
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300"
        >
          Save Profile
        </button>

        <p className="text-xs text-center text-white mt-4">
          "E don set! Profile don ready, share am make di jollof dey."
        </p>
      </div>

      {/* Background Image */}
      <Image
        className="absolute  h-full w-full object-cover top-0 left-0 z-10"
        src={images.bac}
        alt=""
      />
    </div>
  );
}
