"use client";

// ** Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Scroll } from "../Scroll";
import NavItem from "./NavItem";

// ** Icons
import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/icons";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getUserProfile } from "@/services/client/authService";

// ** Utils
import { getCharInitials } from "@/utils";

// ** Config
import { navItems } from "@/config/vertical-navbar";
import Link from "next/link";

const SidebarComponent = () => {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["chef-profile"],
    queryFn: () => getUserProfile(),
    ...queryOptionsConfig,
  });

  if (isLoading) return null;

  return (
    <aside className="relative flex h-svh w-64">
      <div className="fixed inset-0 z-10 w-64 border-r">
        <div className="flex h-full w-full flex-col">
          <div className="border-b p-4">
            <Link href='/'><div className="dev flex items-center gap-2">
              <Logo />
              <span className="whitespace-nowrap font-playfair text-lg font-medium tracking-widest">
                Cook & Recipe
              </span>
            </div></Link>
          </div>

          <div className="mb-2 flex flex-col items-center border-b p-6">
            <div className="relative mb-3">
              <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                <AvatarImage
                  src={userProfile.avatar}
                  alt={userProfile.fullName}
                />
                <AvatarFallback className="text-xl">
                  {getCharInitials(userProfile.fullName)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1 text-center">
              <h2 className="text-xl font-semibold">{userProfile.fullName}</h2>
              <p className="text-sm text-muted-foreground">
                {userProfile.email}
              </p>
            </div>
          </div>

          <Scroll className="flex-1">
            <nav className="max-h-[400px] p-2">
              <ul className="flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <NavItem key={index} navItem={item} index={index} />
                ))}
              </ul>
            </nav>
          </Scroll>

          <div className="w-full border-t p-2">
            <Button
              variant="outline"
              className="w-full justify-start border-none text-destructive">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarComponent;
