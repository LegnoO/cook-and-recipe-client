import { ChefHat, LucideIcon } from "lucide-react";

export interface NavItem {
  isOpen?: boolean;
  icon?: LucideIcon;
  path: string;
  title: string;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  {
    icon: ChefHat,
    path: "/recipes/bookmarks",
    title: "test",
  },
  {
    icon: ChefHat,
    title: "Recipes",
    path: "/recipes",
    children: [
      {
        path: "/recipes/manage",
        title: "Manage",
      },
      {
        path: "/recipes/manage/:id",
        title: "Detail",
      },
    ],
  },
];
