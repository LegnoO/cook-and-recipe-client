import { ChefHat, LucideIcon } from "lucide-react";

export interface NavItemType {
  isOpen?: boolean;
  icon?: LucideIcon;
  path: string;
  title: string;
  children?: NavItemType[];
}

export const navItems: NavItemType[] = [
  {
    icon: ChefHat,
    path: "/",
    title: "Home",
  },
  {
    icon: ChefHat,
    path: "/chefs",
    title: "Chefs",
  },
  {
    icon: ChefHat,
    path: "/recipes/bookmarks",
    title: "Bookmarks",
  },
  {
    icon: ChefHat,
    title: "Recipes",
    path: "/recipes",
    children: [
      {
        path: "/recipes",
        title: "List",
      },
      {
        path: "/recipes/manage",
        title: "Manage",
      },
      {
        path: "/recipes/create",
        title: "Create",
      },
      {
        path: "/recipes/manage/:id",
        title: "Detail",
      },
      {
        path: "/recipes/manage/:id/edit",
        title: "Edit",
      },
    ],
  },
  {
    icon: ChefHat,
    path: "/contact",
    title: "Contact",
  },
];
