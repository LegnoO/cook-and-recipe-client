"use client";

// ** Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ButtonEditProfile from "@/components/Sidebar/_components/ButtonEditProfile";
import ButtonRequestChef from "@/components/Sidebar/_components/ButtonRequestChef";

// ** Icons
import { CalendarDays, MapPin, Phone, Mail, Cake, User2 } from "lucide-react";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Library Imports
import { format } from "date-fns";

// ** Lib
import { cn, formatAddress, getCharInitials } from "@/utils";

// ** Services
import { getUserProfile } from "@/services/client/authService";
import Breadcrumb from "@/components/Breadcrumb";

const ProfilePage = () => {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["chef-profile"],
    queryFn: () => getUserProfile(),
    ...queryOptionsConfig,
  });

  const breadcrumbLinks: BreadcrumbLinks = [
    { title: "Home", href: "/" },
    { title: "Profile" },
  ];

  if (isLoading) {
    return null;
  }

  return (
    <section>
      <div className="mb-8">
        <Breadcrumb items={breadcrumbLinks} />
      </div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Profile</h1>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 flex items-center md:mb-0">
              <Avatar className="mr-4 h-24 w-24">
                <AvatarImage
                  src={userProfile.avatar}
                  alt={userProfile.fullName}
                />
                <AvatarFallback>
                  {getCharInitials(userProfile.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold">{userProfile.fullName}</h2>
                <p className="text-muted-foreground">{userProfile.email}</p>
              </div>
            </div>
            <ButtonEditProfile userProfile={userProfile} />
          </div>
          <Separator className="my-6" />
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <User2 size={18} />
                  <span
                    className={cn({
                      "italic text-muted-foreground": !userProfile.gender,
                    })}>
                    {userProfile.gender}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Cake size={18} />
                  <span
                    className={cn({
                      "italic text-muted-foreground": !userProfile.dateOfBirth,
                    })}>
                    {userProfile.dateOfBirth
                      ? format(userProfile.dateOfBirth, "PPP")
                      : "No birthday added"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={18} />
                  <span>{userProfile.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} />
                  <span>{userProfile.email}</span>
                </div>
                {userProfile.address && (
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span
                      className={cn({
                        "italic text-muted-foreground": !userProfile.address,
                      })}>
                      {formatAddress(userProfile.address)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Chef Information</h2>
              {userProfile.chefInfo ? (
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Level:</span>
                    <span className="rounded-full border px-2.5 py-1 text-xs font-semibold">
                      {userProfile.chefInfo.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Status:</span>

                    <span className="rounded-full border px-2.5 py-1 text-xs font-semibold">
                      {userProfile.chefInfo.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Started Date:</span>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      <span className="text-sm">
                        {new Date(
                          userProfile.chefInfo.startedDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Approval Date:</span>
                    <div className="flex items-center gap-1">
                      <CalendarDays size={14} />
                      <span className="text-sm">
                        {new Date(
                          userProfile.chefInfo.approvalDate,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed py-8">
                  <p className="max-w-[240px] text-center text-muted-foreground">
                    Share your culinary expertise with our community
                  </p>
                  <ButtonRequestChef />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfilePage;
