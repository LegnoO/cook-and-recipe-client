"use client";

// ** React Imports
import { memo, useEffect, useState } from "react";

// ** Next Imports
import { usePathname } from "next/navigation";
import Link from "next/link";

// ** Components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ButtonEditProfile from "./_components/ButtonEditProfile";
import ButtonRequestChef from "./_components/ButtonRequestChef";

// ** Icons
import { Heart, LogOut, BookMarked, ChefHat, ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/icons";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Services
import { getUserProfile } from "@/services/client/authService";

// ** Utils
import { cn, getCharInitials, uniqueFromArrays } from "@/utils";

// ** Config
import { navItems, NavItem } from "@/config/vertical-navbar";

const SidebarComponent = () => {
  const [state, setState] = useState<string[]>([]);

  const pathname = usePathname();

  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["chef-profile"],
    queryFn: () => getUserProfile(),
    ...queryOptionsConfig,
  });

  function containsNavLinkPath(navItem: NavItem, navParent?: NavItem) {
    if (navParent) {
      if (navItem.path && isPathActive(navItem.path)) {
        setState((prev) => {
          const newState = [...prev];
          if (!newState.includes(navParent.title)) {
            newState.push(navParent.title);
            return newState;
          }

          return prev;
        });
      }
    }

    if (navItem.children) {
      navItem.children.some((child) => containsNavLinkPath(child, navItem));
    }
  }

  function isPathActive(pathPattern?: string) {
    if (!pathPattern) return false;

    const regexPathPattern = new RegExp(
      "^" + pathPattern.replace(/:\w+/g, "[^/]+") + "$",
    );

    return regexPathPattern.test(pathname);
  }

  function toggleNavItem(navTitle: string) {
    setState((prev) => {
      const newState = [...prev];
      if (!newState.includes(navTitle)) {
        newState.push(navTitle);
        return newState;
      }

      return newState.filter((ele) => ele !== navTitle);
    });
  }

  useEffect(() => {
    navItems.map((navItem) => containsNavLinkPath(navItem));
  }, []);

  const NavItem = memo(
    ({
      navItem,
      index,
      navParent,
    }: {
      navItem: NavItem;
      index: number;
      navParent?: NavItem;
    }) => {
      if (navItem.children) {
        return (
          <Collapsible
            open={state.includes(navItem.title)}
            onOpenChange={() => {
              toggleNavItem(navItem.title);
            }}
            className="space-y-2">
            <CollapsibleTrigger asChild>
              <li
                key={`${navItem.title}-${index}`}
                className={cn(
                  "cursor-pointer rounded-md p-2 hover:bg-secondary hover:text-secondary-foreground",
                  {
                    "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground/80":
                      state.includes(navItem.title),
                  },
                )}>
                <div className="flex items-center justify-between">
                  <div className="flex flex-1 items-center gap-2">
                    <span className="text-sm">{navItem.title}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </div>
              </li>
            </CollapsibleTrigger>
            <CollapsibleContent className="CollapsibleContent ml-4 space-y-2">
              {navItem.children.map((navItem, index) => (
                <NavItem
                  key={`${navItem.title}-${index}`}
                  navParent={navParent}
                  navItem={navItem}
                  index={index}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        );
      }

      return (
        <li
          key={index}
          className={cn(
            "rounded-md p-2 hover:bg-secondary hover:text-secondary-foreground",
            {
              "bg-primary/80 text-primary-foreground hover:bg-primary hover:text-primary-foreground/80":
                isPathActive(navItem.path),
            },
          )}>
          <Link className="flex items-center gap-2" href={navItem.path || ""}>
            {/* {navItem.icon && <navItem.icon className="h-4 w-4" />} */}
            <span className="text-sm">{navItem.title}</span>
          </Link>
        </li>
      );
    },
  );

  if (isLoading) return null;

  return (
    <aside className="relative flex h-svh w-64">
      <div className="fixed inset-0 z-10 w-64 border-r">
        <div className="flex h-full w-full flex-col">
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="whitespace-nowrap font-playfair text-lg font-medium tracking-widest">
                Cook & Recipe
              </span>
            </div>
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

          <nav className="flex-1 p-2">
            <ul className="flex flex-col space-y-2">
              {navItems.map((item, index) => (
                <NavItem key={index} navItem={item} index={index} />
              ))}
            </ul>
          </nav>

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
