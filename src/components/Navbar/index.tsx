"use client";

// ** Next Imports
import { useParams, usePathname } from "next/navigation";

import Link from "next/link";

// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Components
import Notification from "./Notification";
import UserMenu from "./UserMenu";
import { Button } from "@/components/ui/button";

// ** Library Imports
import { useMediaQuery } from "usehooks-ts";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Icons
import { Logo, Menu, Close } from "@/components/ui/icons";

// ** Store
import { idStore } from "@/store/idStore";

// ** Lib
import { cn } from "@/lib/utils";

const Navbar = () => {
  const animatedNavbarPaths = ["/", "/recipes", "/chefs", "/contact", "/about"];
  const menuItems = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Recipes",
      url: "/recipes",
    },
    {
      label: "The Team",
      url: "/chefs",
    },
    {
      label: "Contact",
      url: "/contact",
    },
    {
      label: "About us",
      url: "/recipes/676d8ebdb442f5f00f27e711",
    },
  ];
  const params = useParams();
  const pathname = usePathname();
  const isMediumScreen = useMediaQuery("(min-width: 768px)");

  const isAnimatedNavbar = animatedNavbarPaths.some((pattern) =>
    matchPatternWithParams(pattern),
  );

  function matchPatternWithParams(pattern: string) {
    const pathnameSegments = pathname.split("/").slice(1);
    const patternSegments = pattern.split("/").slice(1);

    if (!Object.keys(params).length) return pathname === pattern;

    if (patternSegments.length !== pathnameSegments.length) return false;

    return patternSegments.every((seg, index) => {
      if (seg.startsWith(":")) {
        const paramKey = seg.slice(1);
        return params[paramKey] === pathnameSegments[index];
      }

      return seg === pathnameSegments[index];
    });
  }

  const idMap = {
    loginModal: "login-modal",
    navExpand: "nav-expand",
  };

  const { ids, toggleId, removeId } = idStore();
  const { user } = useAuthContext();

  const [isScrolled, setIsScrolled] = useState(false);

  function toggleNavExpand() {
    toggleId(idMap.navExpand);
  }

  function generateRedirectUrl(url: string) {
    const isHomePage = pathname === "/";
    return isHomePage ? url : `${url}?returnTo=${encodeURIComponent(pathname)}`;
  }

  function getNavbarClasses() {
    if (!isAnimatedNavbar) {
      return cn("h-18 z-navbar w-full border-b bg-background");
    }

    return cn(
      "fixed right-0 top-0 z-navbar w-full transition-height duration-350 ease-smooth",
      isScrolled ? "h-18 border-b bg-background" : "bg-overlay h-24",
    );
  }

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const navbarHeight = 98;
      setIsScrolled(scrollPosition >= viewportHeight - navbarHeight);
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMediumScreen) {
      removeId(idMap.navExpand);
    }
  }, [removeId, isMediumScreen, idMap.navExpand]);

  return (
    <header className={getNavbarClasses()}>
      <nav className={cn("container flex h-full items-center justify-between")}>
        <Link href="/" className="flex items-center gap-2 whitespace-nowrap">
          <Logo
            className={cn("text-background", {
              "text-foreground":
                (isAnimatedNavbar && isScrolled) ||
                (!isAnimatedNavbar && !isScrolled),
            })}
          />
          <h5
            className={cn(
              "inline-block whitespace-nowrap py-2 font-playfair text-lg font-medium tracking-widest text-background",
              {
                "text-foreground":
                  (isAnimatedNavbar && isScrolled) ||
                  (!isAnimatedNavbar && !isScrolled),
              },
            )}>
            Cook & Recipe
          </h5>
        </Link>

        <nav className={"hidden lg:flex"}>
          <ul className={"flex items-center gap-4 xl:gap-8"}>
            {menuItems.map((item, index) => {
              return (
                <li className="flex rounded-md" key={index}>
                  <Link
                    href={item.url}
                    className={cn(
                      "underline-animation whitespace-nowrap px-3 py-2 text-sm font-semibold uppercase leading-4 tracking-widest text-muted-foreground transition-colors hover:text-foreground",
                      {
                        "hover:text-background":
                          isAnimatedNavbar && !isScrolled,
                        "hover:text-foreground": isAnimatedNavbar && isScrolled,
                        "is-active text-background":
                          isAnimatedNavbar &&
                          !isScrolled &&
                          pathname === item.url,
                        "is-active text-foreground":
                          isAnimatedNavbar &&
                          isScrolled &&
                          pathname === item.url,
                      },
                    )}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={"flex items-center gap-4"}>
          {user ? (
            <Fragment>
              <Notification />
              <UserMenu user={user} />
            </Fragment>
          ) : (
            <div className="hidden items-center gap-4 lg:flex">
              <Button className="uppercase tracking-widest" variant="secondary">
                {pathname !== "/register" ? (
                  <Link href={generateRedirectUrl("/register")} scroll={false}>
                    Sign Up
                  </Link>
                ) : (
                  "Sign Up"
                )}
              </Button>
              <Button className="uppercase tracking-widest">
                {pathname !== "/login" ? (
                  <Link href={generateRedirectUrl("/login")} scroll={false}>
                    Sign In
                  </Link>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          )}
          <div
            onClick={toggleNavExpand}
            className={"flex items-center lg:hidden"}>
            {ids.includes(idMap.navExpand) ? (
              <Close
                className={cn("text-background", {
                  "text-foreground":
                    (isAnimatedNavbar && isScrolled) ||
                    (!isAnimatedNavbar && !isScrolled),
                })}
              />
            ) : (
              <Menu
                className={cn("text-background", {
                  "text-foreground":
                    (isAnimatedNavbar && isScrolled) ||
                    (!isAnimatedNavbar && !isScrolled),
                })}
              />
            )}
          </div>
        </div>
      </nav>

      <div
        className={cn(
          "invisible z-[1000] m-0 max-h-0 overflow-hidden rounded-b-lg border border-border bg-background transition-all duration-350 ease-smooth",
          {
            "visible max-h-96 p-3": ids.includes(idMap.navExpand),
          },
        )}>
        <ul className={"flex flex-col gap-3 rounded-md"}>
          {menuItems.map((menu, index) => {
            return (
              <li
                key={index}
                className={
                  "whitespace-nowrap rounded-md hover:cursor-pointer hover:bg-secondary lg:flex lg:items-center"
                }>
                <Link
                  className="block rounded-md px-3 py-2 font-medium"
                  href={menu.url}>
                  {menu.label}
                </Link>
              </li>
            );
          })}
          <li
            className={
              "flex justify-center whitespace-nowrap rounded-md bg-primary text-primary-foreground lg:hidden lg:items-center"
            }>
            <Link
              className="block rounded-md px-3 py-2 font-medium"
              href="/login">
              Sign In
            </Link>
          </li>
          <li
            className={
              "flex justify-center rounded-md bg-secondary text-secondary-foreground lg:hidden lg:items-center"
            }>
            <Link
              className="block rounded-md px-3 py-2 font-medium"
              href="/register">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
