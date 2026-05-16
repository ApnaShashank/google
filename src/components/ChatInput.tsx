"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Mic, Send } from "lucide-react";

export default function ChatInput({ placeholder = "Ask anything" }: { placeholder?: string }) {
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/search?q=${encodeURIComponent(value.trim())}&ai=true`);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-6">
      <div className="flex items-center w-full px-4 py-3 bg-[#303134] border border-[#4d5162] focus-within:border-[#5f6368] rounded-2xl transition-all duration-300">
        <button type="button" className="text-gray-400 hover:text-white mr-3 shrink-0">
          <Plus className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="flex-grow bg-transparent outline-none text-sm text-gray-200 py-0.5"
        />
        <div className="flex items-center space-x-3 ml-3 shrink-0">
          <button type="button" title="Search by voice" className="text-gray-400 hover:text-white">
            <Mic className="w-5 h-5" />
          </button>
          {value.trim() && (
            <button type="submit" title="Send" className="text-[#a8c7fa] hover:text-blue-300 transition-colors animate-fade-in">
              <Send className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
