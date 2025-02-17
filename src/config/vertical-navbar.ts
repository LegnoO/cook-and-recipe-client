import { UserIcon, Bookmark, BookOpen, LucideIcon } from "lucide-react";

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
    icon: UserIcon,
    path: "/profile",
    title: "Profile",
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
    isChef: true,
    children: [
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
];
