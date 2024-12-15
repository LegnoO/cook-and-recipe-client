"use client";

// ** Next Imports
import { usePathname } from "next/navigation";
import Link from "next/link";

// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Components
import Notification from "./Notification";
import UserMenu from "./UserMenu";
import { Button } from "@/components/ui/button";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Icons
import { Logo, Menu, Close } from "@/components/ui/icons";

// ** Library Imports
import { useMediaQuery } from "usehooks-ts";

// ** Store
import { idStore } from "@/store/idStore";

// ** Lib
import { cn } from "@/lib/utils";

const Navbar = () => {
  const isMediumScreen = useMediaQuery("(min-width: 768px)");
  const pathname = usePathname();

  const homeRoute = pathname === "/";

  const router = useRouter();

  const idMap = {
    loginModal: "login-modal",
    navExpand: "nav-expand",
  };

  const menu_list = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Recipes",
      url: "/recipes",
    },
    {
      title: "The Team",
      url: "/chefs",
    },
    {
      title: "Contact",
      url: "/",
    },
    {
      title: "About us",
      url: "/",
    },
  ];

  const { ids, toggleId, removeId } = idStore();
  const { user } = useAuthContext();

  const [scrolled, setScrolled] = useState(false);

  function toggleNavExpand() {
    toggleId(idMap.navExpand);
  }

  function navigateTo(url: string) {
    if (homeRoute) return url;

    const encodedPathname = encodeURIComponent(pathname);
    return `${url}?returnTo=${encodedPathname}`;
  }

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY;
      const dVhHeight = window.innerHeight;

      if (scrollPosition < dVhHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMediumScreen) {
      removeId(idMap.navExpand);
    }
  }, [isMediumScreen]);

  return (
    // <header
    //   className={cn(
    //     "right-0 top-0 z-navbar h-22 w-full transition duration-350 ease-smooth",
    //     homeRoute
    //       ? scrolled
    //         ? "fixed bg-background shadow backdrop-blur supports-[backdrop-filter]:bg-background/60"
    //         : "bg-overlay fixed"
    //       : "sticky bg-background shadow backdrop-blur supports-[backdrop-filter]:bg-background/60",
    //   )}>
    <header
      className={cn(
        "fixed right-0 top-0 z-navbar w-full transition-height duration-350 ease-smooth",
        scrolled ? "h-18 border-b bg-background" : "bg-overlay h-24",
      )}>
      <nav className={cn("container flex h-full items-center justify-between")}>
        <Link href="/" className="flex items-center gap-2">
          <Logo
            className={cn("text-background", {
              "text-foreground": scrolled,
            })}
          />
          <h5
            className={cn(
              "inline-block py-2 font-playfair text-lg font-medium tracking-widest text-background",
              {
                "text-foreground": scrolled,
              },
            )}>
            Cook & Recipe
          </h5>
        </Link>

        <nav className={"hidden lg:flex"}>
          <ul className={"flex items-center gap-8"}>
            {menu_list.map((menu, index) => {
              return (
                <li className="flex rounded-md" key={index}>
                  <Link
                    href={menu.url}
                    className={cn(
                      "underline-animation px-3 py-2 text-sm font-semibold uppercase leading-4 tracking-widest text-muted-foreground transition-colors hover:text-foreground",
                      {
                        "hover:text-background": !scrolled,
                      },
                    )}>
                    {menu.title}
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
            <div className="flex items-center gap-4">
              <Button className="uppercase tracking-widest" variant="ghost">
                {pathname !== "/register" ? (
                  <Link href={navigateTo("/register")} scroll={false}>
                    Sign Up
                  </Link>
                ) : (
                  <Fragment>Sign Up</Fragment>
                )}
              </Button>
              <Button className="uppercase tracking-widest">
                {pathname !== "/login" ? (
                  <Link href={navigateTo("/login")} scroll={false}>
                    Sign In
                  </Link>
                ) : (
                  <Fragment>Sign In</Fragment>
                )}
              </Button>
            </div>
          )}
          <div
            onClick={toggleNavExpand}
            className={"flex items-center lg:hidden"}>
            {ids.includes(idMap.navExpand) ? (
              <Close className="text-foreground" />
            ) : (
              <Menu className="text-foreground" />
            )}
          </div>
        </div>
      </nav>
      <div
        className={cn(
          "invisible m-0 max-h-0 overflow-hidden rounded-b-lg border border-border bg-background transition-all duration-350 ease-smooth",
          ids.includes(idMap.navExpand) && "visible max-h-96 p-3",
        )}>
        <ul className={"flex flex-col gap-3 rounded-md"}>
          {menu_list.map((menu, index) => {
            return (
              <li
                key={index}
                className={
                  "rounded-md hover:cursor-pointer hover:bg-secondary lg:flex lg:items-center"
                }>
                <Link
                  className="block rounded-md px-3 py-2 font-medium"
                  href={menu.url}>
                  {menu.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
