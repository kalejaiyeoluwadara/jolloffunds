"use client";
import Image from "next/image";
import { images } from "@/app/utils";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <main className="h-screen overflow-hidden relative w-screen bg-gradient-to-r bg-black text-white  flex flex-col items-center justify-start p-6 text-center">
      <h1 className="text-6xl mt-20 font-bold drop-shadow-md mb-4">
        JollofFunds
      </h1>
      <p className="text-xl mt-3 mb-6 max-w-lg drop-shadow-sm">
        Na your love, na our Jollof! This Christmas, make you dey share joy,
        blessings, and small funds with friends and family. No wahala, just
        vibes!
      </p>
      <button
        onClick={() => {
          router.push("/profile");
        }}
        className="bg-green px-6 py-3 flex items-center justify-center rounded-full z-50 relative gap-3 text-white bg-red-500 font-medium text-xl transition duration-300"
      >
        Create Profile
        <FaArrowRight size={20} />
      </button>
      <Image
        src={images.hero}
        className="absolute  -bottom-20 rounded-[40%] rotate-45 "
        alt="chop"
      />
    </main>
  );
}
