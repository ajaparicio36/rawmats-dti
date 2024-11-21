import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SheetMenu } from "./SheetMenu";
import { User, Supplier } from "@prisma/client";

interface NavbarProps {
  user: User;
  supplier: Supplier | null;
}

export default function NavBar({ user, supplier }: NavbarProps) {
  return (
    <nav className="w-full bg-rawmats-secondary-700 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Image
              src="/logo.png"
              alt="RawMats Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-rawmats-neutral-900" />
              </div>
              <Input
                type="search"
                placeholder="Search"
                className="w-full pl-10 bg-white border-transparent focus:border-transparent focus:ring-0"
              />
            </div>
          </div>

          {/* Menu Button */}
          <div className="flex items-center">
            <SheetMenu user={user} supplier={supplier} />
          </div>
        </div>
      </div>
    </nav>
  );
}
