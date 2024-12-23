"use client";
import { images } from "@/app/utils";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import { ClipLoader } from "react-spinners"; // Importing react-spinners
import { motion, AnimatePresence } from "framer-motion"; // Importing Framer Motion
import axios from "axios"; // Import axios

export default function UserPage() {
  const pathname = usePathname();
  const [profile, setProfile] = useState(null); // State to store user profile
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const [error, setError] = useState(null); // State to store any error message

  useEffect(() => {
    const username = pathname.split("/")[1]; // Extract username from URL
    if (username) {
      // Fetch profile data when username is available
      fetchProfile(username);
    }
  }, [pathname]);

  // Function to fetch profile data from backend
  const fetchProfile = async (username) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users?username=${username}`); // Make GET request to backend
      setProfile(response.data.profile || response.data.profiles[0]); // Set profile data
      setLoading(false);
    } catch (error) {
      setError("Error loading profile data. Please try again later.");
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Aza copied! 🎉");
  };

  const handleSentFunds = () => {
    toast("God bless your hand! Jollof don dey flow 🍛", {
      icon: "💃",
    });
    setTimeout(() => {
      router.push("/completed");
    }, 1000);
  };

  if (loading) {
    return (
      <motion.div
        className="h-screen w-screen flex flex-col gap-3 items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }} // Smooth fade-out
      >
        <ClipLoader color="#22c55e" size={60} /> {/* Using a spinner */}
        <p className="ml-4 text-lg text-white">Loading profile...</p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div className="h-screen w-screen flex flex-col gap-3 items-center justify-center bg-red-500">
        <p className="text-white">{error}</p>
      </motion.div>
    );
  }

  const { username, bankName, accountNumber } = profile || {};

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="h-screen w-screen bg-green-50 text-white flex flex-col items-center justify-center p-6 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }} // Smooth fade-in after loading
      >
        <Toaster position="top-center" />
        <Image
          className="absolute h-full w-full top-0 left-0 object-cover"
          src={images.aza}
          alt="bac"
        />
        {/* Profile Card */}
        <motion.div
          className="bg-white bg-opacity-40 backdrop-blur-md rounded-lg shadow-xl p-6 max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
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
                <span className="text-green-700 font-bold">
                  Account Number:
                </span>{" "}
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
        </motion.div>
        <Link
          href={"/"}
          className=" bg-white bg-opacity-40 backdrop-blur-md rounded-sm shadow-xl fixed bottom-2 right-6 flex items-center justify-center px-6 py-3 gap-2 text-base text-white "
        >
          <FaPlus />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
}
