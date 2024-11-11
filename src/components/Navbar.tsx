"use client";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/navigation";

// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo, Menu, Close } from "@/components/ui/icons";
import { typography } from "@/components/Primitives";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/DropdownMenu";
import ButtonSignUpForm from "@/components/ButtonSignUpForm";
import ButtonSignInForm from "@/components/ButtonSignInForm";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Library Imports
import clsx from "clsx";
import { useMediaQuery } from "usehooks-ts";
import { Loader2 } from "lucide-react";
import { LogOut, Settings, User } from "lucide-react";

// ** Store
import { idStore } from "@/store/idStore";

// ** Utils
import { getCharInitials } from "@/lib/utils/helpers";

const Navbar = () => {
  const router = useRouter();

  const idMap = {
    loginModal: "login-modal",
    navExpand: "nav-expand",
  };
  const menu_items = ["Home", "Recipes", "Chef", "Contact", "About us"];
  const { ids, addId, toggleId, removeId } = idStore();
  const { user, logout } = useAuthContext();

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
    console.log("push ", url);
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
      className={clsx(
        "sticky top-0 z-navbar h-22 bg-background shadow backdrop-blur transition-height duration-350 ease-smooth supports-[backdrop-filter]:bg-background/60",
        {
          "h-18": scrolled,
        },
      )}>
      <nav className="container flex h-full items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="text-foreground" />
          <h5
            className={typography({
              className:
                "inline-block py-2 font-playFair font-medium text-foreground",
              logo: "md",
            })}>
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

        <div className={"flex items-center gap-4"}>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {getCharInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-12 w-12 cursor-pointer">
                    <AvatarImage
                      src={user.avatar}
                      alt={`${user.fullName} Avatar`}
                    />
                    <AvatarFallback>
                      {getCharInitials(user.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{user.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />

                <Link href="/profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>

                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  <LogOut className="mr-1 h-4 w-4" />
                  <span> Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-4">
              <ButtonSignUpForm />
              <ButtonSignInForm />
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
        className={clsx(
          "invisible m-0 max-h-0 overflow-hidden rounded-xl border border-border transition-all duration-350 ease-smooth",
          {
            "visible mt-6 max-h-96 p-3": ids.includes(idMap.navExpand),
          },
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
