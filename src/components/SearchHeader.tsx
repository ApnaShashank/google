import Link from "next/link";
import SearchInput from "./SearchInput";
import { Grid, Beaker, ChevronDown } from "lucide-react";

export default function SearchHeader({ query, tbm = "", isAiMode = false }: { query: string; tbm?: string; isAiMode?: boolean }) {
  const tabs = [
    { id: "", label: "All" },
    { id: "isch", label: "Images" },
    { id: "vid", label: "Videos" },
    { id: "nws", label: "News" }
  ];

  return (
    <header className="sticky top-0 bg-[#22242A] z-50 pt-4 border-b border-[#303134]">
      <div className="flex w-full px-6 py-2 items-center justify-between">
        <div className="flex items-center space-x-6 w-full max-w-4xl">
          {/* AI Mode Selector Dropdown */}
          <div className="flex items-center space-x-1 bg-[#303134] hover:bg-[#4d5162] text-gray-200 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer">
            <span>AI Mode</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Tabs */}
          <nav className="flex space-x-4 text-sm text-gray-400">
            {tabs.map((tab) => {
              const isActive = tbm === tab.id && !isAiMode;
              return (
                <Link
                  key={tab.id}
                  href={`/search?q=${encodeURIComponent(query)}${tab.id ? `&tbm=${tab.id}` : ""}`}
                  className={`pb-1 px-1 transition-colors hover:text-gray-200 ${
                    isActive ? "text-gray-200 border-b-2 border-gray-200 font-medium" : ""
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
            <div className="flex items-center space-x-1 pb-1 px-1 cursor-pointer hover:text-gray-200">
              <span>More</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </nav>

          {/* Search Input (Only shown when not in AI Mode) */}
          {!isAiMode && (
            <div className="flex-grow max-w-md pl-4">
              <SearchInput initialQuery={query} />
            </div>
          )}
        </div>

        {/* Right side icons */}
        <div className="hidden sm:flex items-center space-x-4">
          <button className="p-2 hover:bg-[#303134] rounded-full cursor-pointer transition-colors" title="Search Labs">
            <Beaker className="w-5 h-5 text-gray-200" />
          </button>
          <button className="p-2 hover:bg-[#303134] rounded-full cursor-pointer transition-colors" title="Google apps">
            <Grid className="w-5 h-5 text-gray-200" />
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold shadow-sm">
            S
          </button>
        </div>
      </div>
    </header>
  );
}
