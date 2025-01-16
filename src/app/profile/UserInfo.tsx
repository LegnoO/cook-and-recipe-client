"use client";

// ** React Imports
import { Fragment } from "react";

// ** Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ButtonRequestChef from "./ButtonRequestChef";
import ButtonEditProfile from "./ButtonEditProfile";
import { Skeleton } from "@/components/ui/skeleton";
import Repeat from "@/components/Repeat";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Icons
import { UserIcon, ChefHat, MapPin, Calendar, Phone, User } from "lucide-react";

// ** Library Imports
import { format } from "date-fns";

// ** Lib
import { formatAddress, getCharInitials } from "@/utils";

// ** Services
import { getUserProfile } from "@/services/client/authService";

const UserInfo = () => {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["chef-profile"],
    queryFn: () => getUserProfile(),
    ...queryOptionsConfig,
  });

  const UserInfoSkeleton = () => {
    return (
      <Card className="border-none pt-4 shadow-md md:col-span-1">
        <CardHeader>
          <div className="flex flex-col items-center space-y-4">
            <Skeleton className="h-32 w-32 rounded-full" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </CardHeader>
        <CardContent className="relative flex flex-col items-center space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Repeat times={4}>
            <div className="flex w-full gap-3">
              <Skeleton className="h-6 w-6" />
              <div className="flex-1">
                <Skeleton className="mb-1 h-4 w-1/2" />
                <Skeleton className="h-4" />
              </div>
            </div>
          </Repeat>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) return <UserInfoSkeleton />;

  return (
    <Card className="border-none pt-4 shadow-md md:col-span-1">
      <CardHeader>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
              <AvatarImage
                className="object-cover"
                src={userProfile?.avatar}
                alt={`${userProfile?.fullName} avatar`}
              />
              <AvatarFallback>
                {getCharInitials(userProfile?.fullName)}
              </AvatarFallback>
            </Avatar>

            <Badge
              variant={userProfile?.chefInfo ? "default" : "secondary"}
              className="absolute -right-4 -top-4">
              {!userProfile?.chefInfo ? (
                <Fragment>
                  <ChefHat className="mr-1 h-4 w-4" /> Chef
                </Fragment>
              ) : (
                <Fragment>
                  <User className="mr-1 h-4 w-4" /> User
                </Fragment>
              )}
            </Badge>
          </div>

          <div className="flex flex-col items-center gap-2">
            <CardTitle>{userProfile?.fullName}</CardTitle>
            <span className="text-sm text-muted-foreground">
              {userProfile?.email}
            </span>
            {userProfile?.chefInfo && (
              <Badge variant="secondary">{userProfile?.chefInfo.level}</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative flex flex-col items-center space-y-4">
        <ButtonEditProfile userProfile={userProfile} />
        <Separator className="my-6" />

        <Fragment>
          <div className="flex w-full flex-col gap-2">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  {userProfile?.address ? (
                    formatAddress(userProfile.address)
                  ) : (
                    <i className="text-muted-foreground">Not set</i>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">
                  {userProfile?.phone || (
                    <i className="text-muted-foreground">Not set</i>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Date of Birth</p>
                <p className="text-sm text-muted-foreground">
                  {userProfile?.dateOfBirth ? (
                    format(userProfile?.dateOfBirth, "PPP")
                  ) : (
                    <i className="text-muted-foreground">Not set</i>
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserIcon className="h-5 w-5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Gender</p>
                <p className="text-sm text-muted-foreground">
                  {userProfile?.gender || (
                    <i className="text-muted-foreground">Not set</i>
                  )}
                </p>
              </div>
            </div>
          </div>
        </Fragment>

        <Separator className="my-6" />

        {userProfile?.chefInfo && <ButtonRequestChef />}
      </CardContent>
    </Card>
  );
};

export default UserInfo;
