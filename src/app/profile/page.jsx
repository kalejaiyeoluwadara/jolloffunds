"use client";
import React, { useState } from "react";
import { images } from "@/app/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { useGlobal } from "../context";

export default function Page() {
  const router = useRouter();

  // State for form fields, loading, and dp (profile picture)
  const [username, setUsername] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dp, setDp] = useState(0); // State for dp (profile picture)
  const { setUserName: setGlobalUsername } = useGlobal();

  // Function to handle form submission
  const handleSubmit = async () => {
    // Validation: Ensure all fields are filled
    if (!username || !bankName || !accountNumber) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Show loading spinner
    setIsLoading(true);

    try {
      // Sending POST request to create profile
      const response = await axios.post(
        "https://desserts-backend-u69l.onrender.com/api/v1/users",
        {
          username,
          bankName,
          accountNumber,
          dp, // Sending dp to backend
        }
      );

      if (response.status === 201) {
        // On success, store the username globally and redirect
        router.push("/share"); // Redirect to /share page
        toast.success("Profile created successfully!");
        setGlobalUsername(username); // Set the username in global state
      }
    } catch (error) {
      // Handle error (network issues, server issues, etc.)
      if (error.response) {
        // Server responded with a status code outside of the range [200-299]
        toast.error(
          `Error: ${error.response.data.error || "Something went wrong"}`
        );
      }
    } finally {
      // Hide loading spinner once the request is complete
      setIsLoading(false);
    }
  };
  // env update

  return (
    <div className="h-screen w-screen text-white flex flex-col items-center justify-center p-6 relative">
      <Toaster position="top-center" />

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
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
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="1234567890"
            className="w-full bg-gray-100 text-gray-800 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* DP Avatar Selection */}
        <div className="flex justify-center gap-4 mb-6">
          {[
            images.hero,
            images.hero2,
            images.hero3,
            images.twale,
            images.hero4,
          ].map((avatar, index) => (
            <div
              key={index}
              onClick={() => setDp(index)}
              className={`w-12 flex-shrink-0 h-12 rounded-full cursor-pointer relative ${
                dp === index ? "border-4 border-green-500" : ""
              }`}
            >
              <Image
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className="w-full h-full rounded-full object-cover"
              />
              {dp === index && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg w-full transition duration-300"
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <PuffLoader size={24} color="#fff" />
            </div>
          ) : (
            "Save Profile"
          )}
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
