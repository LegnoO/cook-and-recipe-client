"use client";

// ** Next Imports
import Link from "next/link";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

// ** Icons
import { LogOut, UserIcon, ChefHat, Bookmark } from "lucide-react";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Lib
import { getCharInitials } from "@/utils/helpers";

// ** Types
type Props = { user: User };

const UserMenu = ({ user }: Props) => {
  const { logout } = useAuthContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 cursor-pointer">
          <AvatarImage src={user.avatar} alt="User Avatar" />
          <AvatarFallback>{getCharInitials(user.fullName)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.fullName}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <UserIcon className="h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>

        {user.chefId && (
          <Link href="/recipes/manage">
            <DropdownMenuItem className="cursor-pointer">
              <ChefHat className="h-4 w-4" />
              <span>My Recipes</span>
            </DropdownMenuItem>
          </Link>
        )}

        <Link href="/recipes/manage/bookmark">
          <DropdownMenuItem className="cursor-pointer">
            <Bookmark className="h-4 w-4" />
            <span>Bookmarks</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive hover:!bg-destructive/80 hover:!text-destructive-foreground">
          <LogOut className="h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
