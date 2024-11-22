// ** Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  UserIcon,
  ChefHat,
  MapPin,
  Calendar,
  Phone,
  Users,
} from "lucide-react";
import Repeat from "@/components/Repeat";

// ** Services
import { getUserProfile } from "@/services/authService";
import { formatAddress, getCharInitials } from "@/lib/utils";
import SearchInput from "@/components/SearchInput";
import RecipeCollection from "./UserRecipeCollection";
import ButtonEditProfile from "@/components/ButtonEditProfile";

export default async function Profile() {
  const response = await getUserProfile();
  // const userProfile: UserProfile = await response.json();
  // console.log("🚀 ~ Profile ~ userProfile:", userProfile)

  return null
  // return (
  //   <div className="container my-[35px] space-y-8 p-4">
  //     <div className="flex items-stretch gap-8">
  //       <div className="w-[30%]">
  //         <Card className="border-none pt-4 shadow-md md:col-span-1">
  //           <CardHeader>
  //             <div className="flex flex-col items-center space-y-4">
  //               <div className="relative">
  //                 <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
  //                   <AvatarImage
  //                     src={userProfile.avatar}
  //                     alt={`${userProfile.fullName} avatar`}
  //                   />
  //                   <AvatarFallback>
  //                     {getCharInitials(userProfile.fullName)}
  //                   </AvatarFallback>
  //                 </Avatar>

  //                 <Badge variant="default" className="absolute -right-4 -top-4">
  //                   <ChefHat className="mr-1 h-4 w-4" />
  //                   {userProfile.chefInfo ? "Chef" : "User"}
  //                 </Badge>
  //               </div>

  //               <div className="flex flex-col items-center gap-2">
  //                 <CardTitle>{userProfile.fullName}</CardTitle>
  //                 <span className="text-sm text-muted-foreground">
  //                   {userProfile.email}
  //                 </span>
  //                 <Badge variant="secondary">
  //                   {userProfile.chefInfo.level}
  //                 </Badge>
  //               </div>
  //             </div>
  //           </CardHeader>
  //           <CardContent className="relative flex flex-col items-center space-y-4">
  //             <ButtonEditProfile userProfile={userProfile} />
  //             <Separator className="my-6" />

  //             <div className="flex flex-col gap-2">
  //               <div className="flex items-start gap-3">
  //                 <MapPin className="h-5 w-5" />
  //                 <div className="space-y-1">
  //                   <p className="text-sm font-medium">Address</p>
  //                   <p className="text-sm text-muted-foreground">
  //                     {formatAddress(userProfile.address)}
  //                   </p>
  //                 </div>
  //               </div>

  //               <div className="flex items-start gap-3">
  //                 <Phone className="h-5 w-5" />
  //                 <div className="space-y-1">
  //                   <p className="text-sm font-medium">Phone</p>
  //                   <p className="text-sm text-muted-foreground">
  //                     {userProfile.phone}
  //                   </p>
  //                 </div>
  //               </div>

  //               <div className="flex items-start gap-3">
  //                 <Calendar className="h-5 w-5" />
  //                 <div className="space-y-1">
  //                   <p className="text-sm font-medium">Date of Birth</p>
  //                   <p className="text-sm text-muted-foreground">1/1/1990</p>
  //                 </div>
  //               </div>

  //               <div className="flex items-start gap-3">
  //                 <UserIcon className="h-5 w-5" />
  //                 <div className="space-y-1">
  //                   <p className="text-sm font-medium">Gender</p>
  //                   <p className="text-sm text-muted-foreground">
  //                     {userProfile.gender}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>

  //             <Separator className="my-6" />

  //             <Button variant="secondary" className="w-full">
  //               Request to become a Chef
  //             </Button>
  //           </CardContent>
  //         </Card>
  //       </div>
  //       <div className="w-[70%]">
  //         <RecipeCollection />
  //       </div>
  //     </div>
  //   </div>
  // );
}
