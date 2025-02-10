"use client";

// ** React Imports
import { useEffect, useState } from "react";

// ** Next Imports
import { usePathname } from "next/navigation";
import Link from "next/link";

// ** Component
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// ** Icons
import { ChevronDown, Circle } from "lucide-react";

// ** Utils
import { cn } from "@/utils";

// ** Config
import { navItems, NavItemType } from "@/config/vertical-navbar";

const NavItem = ({
  navItem,
  index,
  navParent,
}: {
  navItem: NavItemType;
  index: number;
  navParent?: NavItemType;
}) => {
  const pathname = usePathname();
  const [state, setState] = useState<string[]>([]);

  function containsNavLinkPath(navItem: NavItemType, navParent?: NavItemType) {
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

    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

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
                {navItem.icon && <navItem.icon className="h-4 w-4" />}
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
          hidden: !isPathActive(navItem.path) && navItem.path.includes(":"),
        },
      )}>
      <Link
        className="flex items-center gap-2"
        href={!navItem.path.includes(":") ? navItem.path : ""}>
        {navItem.icon ? (
          <navItem.icon className="h-4 w-4" />
        ) : (
          <Circle className="h-2 w-2" />
        )}
        <span className="text-sm">{navItem.title}</span>
      </Link>
    </li>
  );
};

export default NavItem;
