import Link from "next/link";

export default function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  return (
    <aside
      className={`flex flex-col items-center py-6 bg-[#22242A] h-screen sticky top-0 shrink-0 transition-all duration-500 ease-in-out z-40 ${
        isOpen
          ? "w-16 border-r border-[#303134] translate-x-0"
          : "w-0 border-r-0 -translate-x-full overflow-hidden absolute left-0"
      }`}
    >
      {/* Google G Logo */}
      <Link href="/" className="mb-8 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
      </Link>

      {/* Menu Icons */}
      <div className="flex flex-col space-y-6">
        <button className="p-2 hover:bg-[#303134] rounded-xl transition-colors cursor-pointer" title="Activity">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white"><path d="M12 3v18"/><path d="m8 17 4 4 4-4"/><path d="m16 7-4-4-4 4"/></svg>
        </button>
        <button className="p-2 hover:bg-[#303134] rounded-xl transition-colors cursor-pointer" title="New chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 hover:text-white"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
        </button>
      </div>
    </aside>
  );
}
