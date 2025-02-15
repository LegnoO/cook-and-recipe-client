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
  isChef?: boolean;
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
        isChef: true,
      },
      {
        path: "/recipes/create",
        title: "Create",
        isChef: true,
      },
      {
        path: "/recipes/manage/:id",
        title: "Detail",
        isChef: true,
      },
      {
        path: "/recipes/manage/:id/edit",
        title: "Edit",
        isChef: true,
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
