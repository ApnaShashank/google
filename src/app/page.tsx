"use client";

import { useState } from "react";
import Link from "next/link";
import SearchInput from "@/components/SearchInput";
import Sidebar from "@/components/Sidebar";
import { Grid, Beaker } from "lucide-react";

export default function Home() {
  const [isAiMode, setIsAiMode] = useState(false);

  const toggleAiMode = () => {
    setIsAiMode((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen relative bg-[#22242A]">
      {/* Sidebar with dynamic sliding animation */}
      <Sidebar isOpen={isAiMode} />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-h-screen transition-all duration-500">
        <header className="flex justify-between p-4 items-center text-sm">
          {/* Left Links - Fades out in AI Mode */}
          <div className={`flex space-x-4 pl-4 transition-all duration-500 ${isAiMode ? "opacity-0 pointer-events-none -translate-x-4" : "opacity-100"}`}>
            <Link href="#" className="hover:underline">About</Link>
            <Link href="#" className="hover:underline">Store</Link>
          </div>

          {/* Right Links & Apps */}
          <div className="flex space-x-4 items-center pr-2">
            <Link href="https://mail.google.com" className={`hover:underline transition-all duration-500 ${isAiMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              Gmail
            </Link>
            <Link href="https://image.google.com" className={`hover:underline transition-all duration-500 ${isAiMode ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
              Images
            </Link>
            <button className="p-2 hover:bg-[#303134] rounded-full transition-colors cursor-pointer" title="Search Labs">
              <Beaker className="w-5 h-5 text-gray-200" />
            </button>
            <button className="p-2 hover:bg-[#303134] rounded-full transition-colors cursor-pointer" title="Google apps">
              <Grid className="w-5 h-5 text-gray-200" />
            </button>
            
            {/* Transition profile picture / sign in */}
            {isAiMode ? (
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-md animate-fade-in">
                S
              </button>
            ) : (
              <button className="bg-blue-600 text-white px-6 py-2 font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm">
                Sign in
              </button>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center -mt-16 px-4">
          <div className="relative w-full max-w-3xl flex flex-col items-center">
            
            {/* Logos container with cross-fade animation */}
            <div className="relative w-full flex justify-center mb-8 h-20">
              {/* Standard Google Logo */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                  isAiMode ? "opacity-0 scale-90 pointer-events-none -translate-y-4" : "opacity-100 scale-100 translate-y-0"
                }`}
              >
                <h1 className="text-7xl font-bold tracking-tighter select-none">
                  <span className="text-[#4285f4]">G</span>
                  <span className="text-[#ea4335]">o</span>
                  <span className="text-[#fbbc05]">o</span>
                  <span className="text-[#4285f4]">g</span>
                  <span className="text-[#34a853]">l</span>
                  <span className="text-[#ea4335]">e</span>
                </h1>
              </div>

              {/* Gemini Style "Hi, Shashank" Text */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-500 transform ${
                  isAiMode ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 pointer-events-none translate-y-4"
                }`}
              >
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-gray-100 text-center">
                  Hi, Shashank. What's on your mind?
                </h2>
              </div>
            </div>

            {/* Search Input Box */}
            <div className="w-full mb-8 z-10">
              <SearchInput
                isHome
                isAiMode={isAiMode}
                onAiModeToggle={toggleAiMode}
              />
            </div>

            {/* Standard buttons (Google Search / I'm Feeling Lucky) - Fades out in AI Mode */}
            <div className={`flex space-x-3 mb-8 transition-all duration-500 ${isAiMode ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100"}`}>
              <button className="bg-[#303134] border border-transparent hover:border-[#5f6368] hover:shadow-sm text-sm text-gray-200 px-4 py-2 rounded-md transition-all">
                Google Search
              </button>
              <button className="bg-[#303134] border border-transparent hover:border-[#5f6368] hover:shadow-sm text-sm text-gray-200 px-4 py-2 rounded-md transition-all">
                I'm Feeling Lucky
              </button>
            </div>

            {/* Language Offerings */}
            <div className="text-sm text-gray-400">
              Google offered in:{" "}
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">हिन्दी</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">বাংলা</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">తెలుగు</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">मराठी</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">தமிழ்</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">ગુજરાતી</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">ಕನ್ನಡ</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">മലയാളം</Link>
              <Link href="#" className="text-[#a8c7fa] hover:underline mx-1">ਪੰਜਾਬੀ</Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-[#16171A] text-sm text-gray-400 mt-auto">
          <div className="px-8 py-3 border-b border-[#303134]">India</div>
          <div className="flex flex-col sm:flex-row justify-between px-8 py-3 space-y-3 sm:space-y-0">
            <div className="flex space-x-6">
              <Link href="#" className="hover:underline">About</Link>
              <Link href="#" className="hover:underline">Advertising</Link>
              <Link href="#" className="hover:underline">Business</Link>
              <Link href="#" className="hover:underline">How Search works</Link>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="hover:underline">Privacy</Link>
              <Link href="#" className="hover:underline">Terms</Link>
              <Link href="#" className="hover:underline">Settings</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
