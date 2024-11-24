"use client";

// ** Next Imports
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
  const router = useRouter();

  const idMap = {
    loginModal: "login-modal",
    navExpand: "nav-expand",
  };
  const menu_items = ["Home", "Recipes", "Chef", "Contact", "About us"];
  const { ids, addId, toggleId, removeId } = idStore();
  const { user } = useAuthContext();

  const [scrolled, setScrolled] = useState(false);

  function handleOpenLogin() {
    addId(idMap.loginModal);
  }

  function handleCloseLogin() {
    removeId(idMap.loginModal);
  }

  function toggleNavExpand() {
    toggleId(idMap.navExpand);
  }

  function navigateTo(url: string) {
    router.push(url);
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 50) {
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

  return (
    <header
      className={cn(
        "sticky top-0 z-navbar bg-background shadow backdrop-blur transition-height duration-350 ease-smooth supports-[backdrop-filter]:bg-background/60",
        scrolled ? "h-18" : "h-22",
      )}>
      <nav className="container flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="text-foreground" />
          <h5 className="inline-block py-2 font-playFair text-lg font-medium text-foreground">
            Cook & Recipe
          </h5>
        </Link>

        <nav className={"hidden lg:flex"}>
          <ul className={"flex items-center gap-6"}>
            {menu_items.map((item, index) => {
              return (
                <li className="flex rounded-md" key={index}>
                  <Link
                    href="#"
                    className="px-3 py-2 font-medium transition-colors hover:text-primary">
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={"flex items-center gap-2.5"}>
          {user ? (
            <Fragment>
              <Notification />
              <UserMenu />
            </Fragment>
          ) : (
            <div className="flex items-center gap-4">
              <Button variant="ghost">
                <Link href="/register" scroll={false}>
                  Sign Up
                </Link>
              </Button>
              <Button>
                <Link href="/login" scroll={false}>
                  Sign In
                </Link>
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
          "invisible m-0 max-h-0 overflow-hidden rounded-xl border border-border transition-all duration-350 ease-smooth",
          ids.includes(idMap.navExpand) && "visible mt-6 max-h-96 p-3",
        )}>
        <ul className={"flex flex-col gap-3 rounded-md"}>
          {menu_items.map((item, index) => {
            return (
              <li
                key={index}
                className={"rounded-md hover:bg-muted lg:flex lg:items-center"}>
                <a className="block rounded-md px-3 py-2 font-medium" href="#">
                  {item}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
