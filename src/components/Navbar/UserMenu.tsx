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
} from "@/components/ui/dropdown-menu";

// ** Icons
import { LogOut, Settings, User } from "lucide-react";

// ** Context
import { useAuthContext } from "@/context/AuthProvider";

// ** Lib
import { getCharInitials } from "@/lib/utils/helpers";

// ** Types
type Props = { user: User };

const UserMenu = ({ user }: Props) => {
  const { isLoading, logout } = useAuthContext();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{getCharInitials(user.fullName)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-12 w-12 cursor-pointer">
            <AvatarImage src={user.avatar} alt={`${user.fullName} Avatar`} />
            <AvatarFallback>{getCharInitials(user.fullName)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
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

        <DropdownMenuItem
          disabled={isLoading}
          onClick={logout}
          className="cursor-pointer">
          <LogOut className="mr-1 h-4 w-4" />
          <span> Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
