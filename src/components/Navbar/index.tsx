"use client";

// ** Next Imports
import Link from "next/link";
import { useRouter } from "next/navigation";

// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Logo, Menu, Close } from "@/components/ui/Icons";
import { typography } from "@/components/Primitives";
import { Button } from "@/components/ui/Button";

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

import ButtonLoginForm from "../ButtonLoginForm";

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

// ** Styles
import styles from "./Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const matches = useMediaQuery("(min-width: 1024px)");
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
    <Fragment>
      <header
        className={clsx(styles.wrapper, {
          [styles.navScrolled]: scrolled,
        })}>
        <div className="container">
          <nav className={styles.nav}>
            <div className="flex items-center space-x-3">
              <Logo className="text-foreground" />
              <h5
                className={typography({
                  className: "inline-block py-2 font-medium text-foreground",
                  logo: "md",
                })}>
                Cook & Recipe
              </h5>
            </div>

            <ul className={"ml-6 hidden space-x-6 lg:flex"}>
              {menu_items.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={
                      "flex items-center rounded-md text-primary transition hover:bg-background-hover"
                    }>
                    <a
                      className={typography({
                        className: "inline-block px-3 py-2 font-medium",
                        text: "md",
                      })}
                      href="#">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className={"flex items-center gap-4"}>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {getCharInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
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
                        <p className="text-sm text-secondary">{user.email}</p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />

                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="ml-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem className="cursor-pointer">
                      <User className="ml-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Button
                        className="w-full items-center justify-start"
                        variant="destructive">
                        <LogOut className="mr-1 h-4 w-4" />
                        Sign out
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-4">
                  <Button variant="secondary">Sign up</Button>
                  <ButtonLoginForm />
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
            className={clsx(styles.navExpand, {
              [styles.expanded]: ids.includes(idMap.navExpand),
            })}>
            <ul className={"flex flex-col gap-3 rounded-md"}>
              {menu_items.map((item, index) => {
                return (
                  <li
                    key={index}
                    className={
                      "rounded-md hover:bg-muted lg:flex lg:items-center"
                    }>
                    <a
                      className={typography({
                        className:
                          "block rounded-md px-3 py-2 font-medium text-foreground",
                        text: "sm",
                      })}
                      href="#">
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
      <div className={styles.navbarSpace} />
    </Fragment>
  );
};

export default Navbar;
