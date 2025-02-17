"use client";

// ** Next Imports
import Link from "next/link";

// ** Components
import { Button } from "@/components/ui/button";
import { Scroll } from "../Scroll";
import NavItem from "./NavItem";

// ** Icons
import { LogOut } from "lucide-react";
import { Logo } from "@/components/ui/icons";

// ** Library Imports
import { useRouter } from "nextjs-toploader/app";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Config
import { navItems } from "@/config/vertical-navbar";

const SidebarComponent = () => {
  const router = useRouter();
  const { logout } = useAuthContext();

  async function logoutAccess() {
    await logout();
    router.push("/");
  }

  return (
    <aside className="relative flex h-svh w-64">
      <div className="fixed inset-0 z-10 w-64 border-r">
        <div className="flex h-full w-full flex-col">
          <div className="border-b p-4">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Logo />
                <span className="whitespace-nowrap font-playfair text-lg font-medium tracking-widest">
                  Cook & Recipe
                </span>
              </div>
            </Link>
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
              className="w-full justify-start border-none text-destructive"
              onClick={logoutAccess}>
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
