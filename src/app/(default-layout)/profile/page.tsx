// ** Components
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Users,
  ChefHat,
  MapPin,
  Calendar,
  Phone,
  Mail,
} from "lucide-react";
import Repeat from "@/components/Repeat";

// ** Services
import { getUserProfile } from "@/services/authService";
import { formatAddress, getCharInitials } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function Profile() {
  const response = await getUserProfile();
  if (!response.ok) {
    redirect("/");
  }
  const userProfile = await response.json();
  console.log("============ ", userProfile);
  return (
    <div className="container my-[35px] space-y-8 p-4">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <Avatar className="h-32 w-32">
                <AvatarImage
                  src={userProfile.avatar}
                  alt={`avatar ${userProfile.fullName}`}
                />
                <AvatarFallback>
                  {getCharInitials(userProfile.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{userProfile.fullName}</h2>
                <p className="flex items-center justify-center text-muted-foreground">
                  <Mail className="mr-1 h-4 w-4" />
                  {userProfile.email}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  <ChefHat className="mr-1 h-4 w-4" />
                  {userProfile.chefInfo ? "Chef" : "User"}
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <Calendar className="mr-1 h-4 w-4" />
                  {/* {userProfile.dateOfBirth.toLocaleDateString("vi-VN")} */}
                  1/1/1990
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  {userProfile.gender}
                </Badge>
              </div>
              <Button className="w-full">Request to become a Chef</Button>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>{`Address: ${formatAddress(userProfile.address)}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary" />
                <span>Phone: {userProfile.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-secondary" />
                {/* <span>
                  Ngày sinh: {user.dateOfBirth.toLocaleDateString("vi-VN")}
                </span> */}
                <span>Birthday: 1/1/1990</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-secondary" />
                <span>Gender: {userProfile.gender}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-xl">My recipes</CardTitle>
              <CardDescription>
                {/* Các món ăn bạn đã chia sẻ ({user.recipeCount}) */}
                Các món ăn bạn đã chia sẻ 15
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full p-4">
              {/* {recipes.map((recipe) => (
                  <Card key={recipe.id}>
                    <CardContent className="flex items-center space-x-4 pt-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src={recipe.image} alt={recipe.title} />
                        <AvatarFallback>
                          {recipe.title.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">
                          {recipe.title}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{recipe.cookingTime} phút</span>
                          <Users className="ml-2 h-4 w-4" />
                          <span>{recipe.servings} người</span>
                        </div>
                        <Badge
                          variant={
                            recipe.difficulty === "easy"
                              ? "secondary"
                              : "default"
                          }
                          className="mt-2">
                          {recipe.difficulty === "easy"
                            ? "Dễ"
                            : recipe.difficulty === "medium"
                              ? "Vừa"
                              : "Khó"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))} */}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Repeat times={4}>
                  <div className="flex items-center space-x-2 rounded-md border border-divider p-4">
                    <img
                      className="h-24 w-24 rounded-md object-cover"
                      src={
                        "https://pivoo.themepreview.xyz/home-two/wp-content/uploads/sites/3/2024/04/beth-macdonald-V6LEV6CBVLw-unsplash-1-150x150.jpg"
                      }
                      alt={"recipe"}
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                          {/* {recipe.title} */}
                          title
                        </h3>
                        <Badge
                          // variant={
                          //   recipe.difficulty === "easy" ? "secondary" : "default"
                          // }
                          variant={"default"}>
                          {/* {recipe.difficulty === "easy"
                          ? "Dễ"
                          : recipe.difficulty === "medium"
                            ? "Vừa"
                            : "Khó"} */}
                          Khó
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {/* <span>{recipe.cookingTime} phút</span> */}
                        <span>4 phút</span>
                        <Users className="ml-2 h-4 w-4" />
                        {/* <span>{recipe.servings} người</span> */}
                        <span>4 người</span>
                      </div>

                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        Bánh mì giòn với thịt nướng thơm lừng và rau sống tươi
                        mát...
                      </p>
                    </div>
                  </div>
                </Repeat>
              </div>

              <Button variant="outline" className="mt-6 w-full">
                {/* Xem tất cả {user.recipeCount} công thức */}
                Xem tất cả 4 công thức
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
