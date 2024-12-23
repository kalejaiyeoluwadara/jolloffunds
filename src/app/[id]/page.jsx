"use client";
import { images } from "@/app/utils";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaMoneyBillWave, FaUserCircle } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function UserPage() {
  const pathname = usePathname();
  const [username, setUsername] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const id = pathname.split("/")[1];
    if (id) setUsername(id);
  }, [pathname]);

  const bankName = "Access Bank"; // Replace with dynamic user's bank
  const accountNumber = "1234567890"; // Replace with dynamic user's account number

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Aza copied!🎉");
  };

  const handleSentFunds = () => {
    toast("God bless your hand! Jollof don dey flow 🍛", {
      icon: "💃",
    });
    setTimeout(() => {
      router.push("/completed");
    }, 1000);
  };

  if (!username) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-green-50">
        <p className="text-lg text-gray-600">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-green-50 text-white flex flex-col items-center justify-center p-6 relative">
      <Toaster position="top-center" />
      <Image
        className="absolute h-full w-full top-0 left-0 object-cover"
        src={images.aza}
        alt="bac"
      />
      {/* Profile Card */}
      <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-lg shadow-xl p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center flex-col w-full justify-center gap-3 mb-6">
          <Image
            className="h-[90px] w-[90px] rounded-full object-center"
            src={images.hero}
            alt="bac"
          />
          <h1 className="text-2xl font-bold text-white">@{username}</h1>
        </div>

        {/* Account Details */}
        <h2 className="text-lg font-medium text-white mb-4 text-center">
          Account Details
        </h2>
        <div className="space-y-4">
          {/* Bank Name */}
          <div className="bg-green-100 text-black rounded-lg p-4 shadow-md">
            <p className="text-base font-medium">
              <span className="text-green-700 font-bold">Bank Name:</span>{" "}
              {bankName}
            </p>
          </div>

          {/* Account Number */}
          <div className="bg-green-100 text-black rounded-lg p-4 shadow-md flex items-center justify-between">
            <p className="text-base font-medium">
              <span className="text-green-700 font-bold">Account Number:</span>{" "}
              {accountNumber}
            </p>
            <button
              onClick={() => copyToClipboard(accountNumber)}
              className="text-green-600 hover:text-green-700"
            >
              <FiCopy className="text-xl" />
            </button>
          </div>
        </div>

        {/* Hype Text */}
        <p className="text-center text-white my-6">
          "No reason am, just run am! Bless @{username} with funds, jollof go
          land and your own blessings go double!
        </p>

        {/* Sent Funds Button */}
        <button
          onClick={handleSentFunds}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300 flex items-center justify-center gap-2"
        >
          <FaMoneyBillWave className="text-2xl" /> I Don Send Funds
        </button>
      </div>
    </div>
  );
}
