// ** Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import UserRecipeCollection from "./UserRecipeCollection";
import ButtonRequestChef from "./ButtonRequestChef";
import ButtonEditProfile from "./ButtonEditProfile";

// ** Icons
import { UserIcon, ChefHat, MapPin, Calendar, Phone } from "lucide-react";

// ** Library Imports
import { format } from "date-fns";

// ** Lib
import { formatAddress, getCharInitials } from "@/lib/utils";
import serverFetch from "@/lib/serverFetch";

async function getUserProfile() {
  const response = await serverFetch(`/users/owned/profile`);

  const userInfo = await response.json();
  return userInfo;
}

export default async function Profile() {
  const userProfile = await getUserProfile();

  return (
    <div className="container my-[35px] space-y-8 p-4">
      <div className="flex flex-col items-stretch gap-8 md:flex-row">
        <div className="w-full md:w-[30%]">
          <Card className="border-none pt-4 shadow-md md:col-span-1">
            <CardHeader>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage
                      className="object-cover"
                      src={userProfile.avatar}
                      alt={`${userProfile.fullName} avatar`}
                    />
                    <AvatarFallback>
                      {getCharInitials(userProfile.fullName)}
                    </AvatarFallback>
                  </Avatar>

                  <Badge variant="default" className="absolute -right-4 -top-4">
                    <ChefHat className="mr-1 h-4 w-4" />
                    {userProfile.chefInfo ? "Chef" : "User"}
                  </Badge>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <CardTitle>{userProfile.fullName}</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {userProfile.email}
                  </span>
                  <Badge variant="secondary">
                    {userProfile.chefInfo.level}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative flex flex-col items-center space-y-4">
              <ButtonEditProfile userProfile={userProfile} />
              <Separator className="my-6" />

              <div className="flex w-full flex-col gap-2">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {formatAddress(userProfile.address)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {userProfile.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">
                      {userProfile.dateOfBirth ? (
                        format(userProfile.dateOfBirth, "PPP")
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
                      {userProfile.gender}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <ButtonRequestChef />
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-[70%]">
          <UserRecipeCollection />
        </div>
      </div>
    </div>
  );
}
