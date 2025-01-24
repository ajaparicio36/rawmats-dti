"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { User, Supplier } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SheetMenu } from "./SheetMenu";
import { AnimatedNav, AnimatedH1, AnimatedDiv } from "./AnimatedComponents";
import { SearchSuggestions } from "./SearchSuggestions";

interface NavbarProps {
  user: User;
  supplier: Supplier | null;
}

export default function NavBar({ user, supplier }: NavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const performSearch = (query: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("search", query);
    searchParams.set("page", "1");
    router.push(`/?${searchParams.toString()}`);
    setShowSuggestions(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    performSearch(suggestion);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AnimatedNav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-2">
          <AnimatedH1
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/")}
            className="text-5xl md:text-6xl px-4 py-2 rounded-md text-white hover:cursor-pointer transition-colors duration-200 font-extrabold tracking-wider bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            RAWMATS
          </AnimatedH1>
        </div>

        <div className="flex items-center justify-between h-16 pb-4">
          <div className="flex items-center">
            <SheetMenu user={user} supplier={supplier} />
          </div>

          <div className="flex-1 max-w-2xl mx-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <AnimatedDiv
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/20 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full pl-10 bg-white/80 text-blue-900 border-transparent focus:border-transparent focus:ring-2 focus:ring-blue-400 rounded-full placeholder-blue-400"
                />
              </AnimatedDiv>
              {showSuggestions && (
                <SearchSuggestions
                  query={searchQuery}
                  onSelect={handleSuggestionSelect}
                />
              )}
            </form>
          </div>

          <div className="w-10"></div>
        </div>
      </div>
    </AnimatedNav>
  );
}
