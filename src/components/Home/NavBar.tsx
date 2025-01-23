"use client";

import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { User, Supplier } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SheetMenu } from "./SheetMenu";
import {
  AnimatedNav,
  AnimatedH1,
  AnimatedDiv,
} from "@/components/Home/AnimatedComponents";
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
      className="w-full bg-rawmats-secondary-700 border-b"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-4">
          <AnimatedH1
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push("/")}
            className="text-3xl px-2 py-1 rounded-md text-white hover:cursor-pointer hover:bg-rawmats-secondary-900"
          >
            <span className="font-bold">RAW</span>MATS
          </AnimatedH1>
        </div>

        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SheetMenu user={user} supplier={supplier} />
          </div>

          <div className="flex-1 max-w-2xl mx-4" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-rawmats-neutral-900" />
              </div>
              <AnimatedDiv
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full pl-10 bg-white text-rawmats-neutral-900 border-transparent focus:border-transparent focus:ring-0 rounded-full"
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
