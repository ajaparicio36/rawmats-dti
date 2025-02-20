"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatedNav, AnimatedH1, AnimatedDiv } from "./AnimatedComponents";
import { SearchSuggestions } from "./SearchSuggestions";
import type { User, Supplier } from "@prisma/client";

interface NavbarProps {
  user: User;
  supplier: Supplier | null;
}

export default function NavBar({ user, supplier }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    console.log(`Searching for: ${searchQuery}`);
    console.log(`User ID: ${user.id}`);
    console.log(`Is supplier: ${supplier !== null}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
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
        <div className="flex items-center justify-between h-16">
          <SidebarTrigger className="text-white mr-4" />
          <AnimatedH1
            whileHover={{ scale: 1.05 }}
            className="text-5xl md:text-6xl font-extrabold tracking-wide bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
          >
            RAWMATS
          </AnimatedH1>
          <div className="flex-1 max-w-2xl mx-auto" ref={searchRef}>
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
        </div>
      </div>
    </AnimatedNav>
  );
}
