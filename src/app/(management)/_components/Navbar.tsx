"use client";

// ** Next Imports
import Link from "next/link";

// ** Components
import Notification from "@/components/Navbar/Notification";
import UserMenu from "@/components/Navbar/UserMenu";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

const Navbar = () => {
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
      label: "Chefs",
      url: "/chefs",
    },
    {
      label: "Contact",
      url: "/contact",
    },
  ];

  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="rounded-lg px-4 py-2 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.url}>
              <div className="text-sm text-muted-foreground hover:text-foreground">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <Notification />
          {user && <UserMenu user={user} />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
