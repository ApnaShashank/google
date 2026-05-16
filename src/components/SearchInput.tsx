"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Mic, Camera, Plus, Sparkles, X, ArrowRight } from "lucide-react";

export default function SearchInput({
  initialQuery = "",
  isHome = false,
  isAiMode = false,
  onAiModeToggle
}: {
  initialQuery?: string;
  isHome?: boolean;
  isAiMode?: boolean;
  onAiModeToggle?: () => void;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const allSuggestions = [
    "what is ai. how it works",
    "what is ai. com",
    "what is a air and o",
    "what is aie",
    "what does aire do"
  ];

  const filteredSuggestions = query
    ? allSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent, selectedQuery?: string) => {
    e.preventDefault();
    const searchVal = selectedQuery || query;
    if (searchVal.trim()) {
      setIsOpen(false);
      const aiParam = isAiMode ? "&ai=true" : "";
      router.push(`/search?q=${encodeURIComponent(searchVal.trim())}${aiParam}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto">
      <form
        onSubmit={(e) => handleSearch(e)}
        className={`flex items-center w-full px-4 py-2 bg-[#303134] border border-[#5f6368] hover:bg-[#4d5162] focus-within:bg-[#303134] transition-all duration-300 ${
          isOpen && filteredSuggestions.length > 0
            ? "rounded-t-2xl border-b-0"
            : "rounded-full"
        }`}
      >
        {isHome && isAiMode ? (
          <Plus className="w-5 h-5 text-gray-400 mr-3 shrink-0 animate-fade-in" />
        ) : null}
        <input
          type="text"
          placeholder={isAiMode ? "Ask Google" : "Search Google or type a URL"}
          className="flex-grow w-full outline-none text-base text-gray-200 bg-transparent py-1 transition-all duration-300"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoFocus
        />
        <div className="flex items-center space-x-3 ml-3 shrink-0">
          {query ? (
            <button
              type="button"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              onClick={() => {
                setQuery("");
                setIsOpen(false);
              }}
              title="Clear"
            >
              <X className="w-5 h-5" />
            </button>
          ) : null}
          {!isHome && <span className="hidden sm:inline-block w-px h-6 bg-[#5f6368]"></span>}
          
          <button type="button" title="Search by voice" className="text-gray-300 hover:text-white">
            <Mic className="w-5 h-5" />
          </button>
          <button type="button" title="Search by image" className="text-gray-300 hover:text-white mr-1">
            <Camera className="w-5 h-5" />
          </button>

          {isHome ? (
            <button
              type="button"
              onClick={onAiModeToggle}
              className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isAiMode
                  ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-[#a8c7fa] hover:from-blue-500/30 hover:to-purple-500/30"
                  : "bg-[#4d5162] hover:bg-[#5f6368] text-gray-200"
              }`}
            >
              <Sparkles className={`w-4 h-4 ${isAiMode ? "text-[#a8c7fa]" : "text-gray-300"}`} />
              <span>AI Mode</span>
            </button>
          ) : (
            <button type="submit" title="Search" className="text-[#a8c7fa] hover:text-blue-300">
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-[#303134] border-x border-b border-[#5f6368] rounded-b-2xl shadow-xl z-50 py-2 animate-fade-in">
          <ul>
            {filteredSuggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={(e) => handleSearch(e, suggestion)}
                className="flex items-center px-4 py-2 hover:bg-[#4d5162] cursor-pointer text-gray-200 transition-colors"
              >
                <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center px-4 pt-2 mt-2 border-t border-[#4d5162] text-xs text-gray-400">
            <span>Report inappropriate predictions</span>
            {isHome && (
              <button
                onClick={(e) => handleSearch(e)}
                className="flex items-center space-x-1 bg-[#4d5162] hover:bg-[#5f6368] text-gray-200 px-3 py-1 rounded-full text-xs transition-colors"
              >
                <span>AI Mode</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
