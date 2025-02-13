import {
  ChefHat,
  Contact,
  MailOpen,
  UserIcon,
  Bookmark,
  BookOpen,
  LucideIcon,
} from "lucide-react";

export interface NavItemType {
  isOpen?: boolean;
  icon?: LucideIcon;
  path: string;
  title: string;
  children?: NavItemType[];
}

export const navItems: NavItemType[] = [
  {
    icon: MailOpen,
    path: "/",
    title: "Home",
  },
  {
    icon: ChefHat,
    path: "/chefs",
    title: "Chefs",
  },
  {
    icon: Bookmark,
    path: "/recipes/bookmarks",
    title: "Bookmarks",
  },
  {
    icon: BookOpen,
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
    icon: Contact,
    path: "/contact",
    title: "Contact",
  },
  {
    icon: UserIcon,
    path: "/profile",
    title: "Profile",
  },
];
