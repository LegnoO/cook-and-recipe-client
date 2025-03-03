"use client";

// ** React Imports
import { Fragment, useState } from "react";

// ** Components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectTrigger,
  Select,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ButtonEditProfile from "@/components/Sidebar/_components/ButtonEditProfile";
import ButtonRequestChef from "@/components/Sidebar/_components/ButtonRequestChef";
import Breadcrumb from "@/components/Breadcrumb";
import Loading from "../_components/Loading";

// ** Icons
import { User2, ChefHat, Edit, Loader2, Check } from "lucide-react";

// ** Config
import { queryOptionsConfig } from "@/config/useQueryOptions";

// ** Library Imports
import { useQuery } from "@tanstack/react-query";

// ** Hooks
import { useToast } from "@/hooks/useToast";

// ** Lib
import { cn, formatAddress } from "@/utils";

// ** Services
import { getUserProfile } from "@/services/client/authService";
import { updateChefInfo } from "@/services/client/chefService";

const ProfileInfo = () => {
  const { toast } = useToast();
  const experienceLevels = ["Beginner", "Home cook", "Professional", "Master"];
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState({
    description: false,
    level: false,
  });
  const [level, setLevel] = useState("");
  const [description, setDescription] = useState("");
  const {
    data: userProfile,
    refetch,
    isLoading: queryLoading,
  } = useQuery({
    queryKey: ["chef-profile"],
    queryFn: () => getUserProfile(),
    ...queryOptionsConfig,
  });

  const breadcrumbLinks: BreadcrumbLinks = [
    { title: "Home", href: "/" },
    { title: "Profile" },
  ];

  if (queryLoading) {
    return <Loading />;
  }

  if (!userProfile) {
    return null;
  }

  async function onSubmit() {
    try {
      setIsLoading(true);
      if (
        userProfile.chefInfo.level !== level ||
        userProfile.chefInfo.description !== description
      ) {
        await updateChefInfo(level, description);
        refetch();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="pb-24">
      <div className="mb-8">
        <Breadcrumb items={breadcrumbLinks} />
      </div>
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Profile</h1>
      <Card className="overflow-hidden shadow-md">
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 flex items-center md:mb-0">
              <Avatar className="mr-4 h-24 w-24">
                <AvatarImage
                  src={userProfile.avatar || "/images/avatar-default.png"}
                  alt={userProfile.fullName}
                />
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold">{userProfile.fullName}</h2>
                <p className="text-muted-foreground">{userProfile.email}</p>

                <Badge
                  className="mt-2 flex w-fit items-center gap-1 rounded-2xl font-medium capitalize"
                  variant="secondary">
                  {userProfile.chefInfo ? (
                    <Fragment>
                      <ChefHat className="h-3.5 w-3.5" />
                      {`${userProfile.chefInfo.level} Chef`}
                    </Fragment>
                  ) : (
                    <Fragment>
                      <User2 className="h-3.5 w-3.5" /> User
                    </Fragment>
                  )}
                </Badge>
              </div>
            </div>
            <ButtonEditProfile userProfile={userProfile} />
          </div>

          {userProfile.chefInfo && (
            <div className="rounded-lg bg-secondary p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-medium">
                  <ChefHat className="h-5 w-5" />
                  Chef Description
                </h3>
                {userProfile.chefInfo.status !== "pending" && (
                  <Button
                    disabled={isLoading}
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setIsEditing((prev) => ({
                        ...prev,
                        description: !prev.description,
                      }))
                    }
                    className="h-8 hover:bg-muted-foreground/20 hover:text-muted">
                    {isLoading ? (
                      <Loader2
                        className={cn("h-4 w-4", {
                          "animate-spin": !isLoading,
                        })}
                      />
                    ) : (
                      <Edit className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>

              {isEditing.description ? (
                <div className="space-y-3">
                  <Textarea
                    value={
                      description
                        ? description
                        : userProfile.chefInfo.description
                    }
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] border-gray-300 bg-white focus-visible:ring-gray-400"
                  />
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setIsEditing((prev) => ({
                          ...prev,
                          description: false,
                        }))
                      }
                      className="border-gray-300 text-gray-600">
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gray-800 text-white hover:bg-gray-700"
                      onClick={() => {
                        setIsEditing((prev) => ({
                          ...prev,
                          description: false,
                        }));
                        onSubmit();
                      }}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <p
                  className={cn("leading-relaxed text-muted-foreground", {
                    italic: !description,
                  })}>
                  {description || "No description"}
                </p>
              )}
            </div>
          )}

          <Tabs defaultValue="personal" className="mt-8 min-h-[176px]">
            <TabsList className="mb-6 grid w-full grid-cols-2">
              <TabsTrigger value="personal" className="text-sm">
                Personal Information
              </TabsTrigger>
              <TabsTrigger value="chef" className="text-sm">
                Chef Information
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    Email
                  </p>
                  <p className="font-medium">{userProfile.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    Phone
                  </p>
                  <p
                    className={cn("font-medium", {
                      "italic text-muted-foreground": !userProfile.phone,
                    })}>
                    {userProfile.phone || "No phone added"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    Gender
                  </p>
                  <p
                    className={cn("font-medium", {
                      "italic text-muted-foreground": !userProfile.gender,
                    })}>
                    {userProfile.gender || "No gender added"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    Birthday
                  </p>
                  <p
                    className={cn("font-medium", {
                      "italic text-muted-foreground": !userProfile.dateOfBirth,
                    })}>
                    {userProfile.dateOfBirth || "No birthday added"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    Started Date
                  </p>
                  <p
                    className={cn("font-medium", {
                      "italic text-muted-foreground": !userProfile.createdDate,
                    })}>
                    Joined on:{" "}
                    {userProfile.createdDate
                      ? new Date(userProfile.createdDate).toLocaleDateString()
                      : "Invalid date"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    Address
                  </p>
                  <p
                    className={cn("font-medium", {
                      "italic text-muted-foreground": !userProfile.dateOfBirth,
                    })}>
                    {userProfile.address
                      ? formatAddress(userProfile.address)
                      : "No address added"}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chef">
              {userProfile.chefInfo ? (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        Level
                      </p>
                      {isEditing.level ? (
                        <Select
                          value={level ? level : userProfile.chefInfo.level}
                          onValueChange={(value) => setLevel(value)}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Level" />
                          </SelectTrigger>

                          <SelectContent>
                            {experienceLevels.map((level, index) => (
                              <SelectItem key={index} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="font-medium">
                          {userProfile.chefInfo.level}
                        </p>
                      )}
                    </div>
                    {userProfile.chefInfo.status !== "pending" && (
                      <Button
                        disabled={isLoading}
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (isEditing.level) {
                            onSubmit();
                          }
                          setIsEditing((prev) => ({
                            ...prev,
                            level: !prev.level,
                          }));
                        }}
                        className="h-8 hover:bg-muted-foreground/20 hover:text-muted">
                        {isLoading ? (
                          <Loader2
                            className={cn("h-4 w-4", {
                              "animate-spin": !isLoading,
                            })}
                          />
                        ) : isEditing.level ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Edit className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      Status
                    </p>
                    <p className="font-medium capitalize">
                      {userProfile.chefInfo.status}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      Started Date
                    </p>
                    <p
                      className={cn("font-medium", {
                        "italic text-muted-foreground":
                          !userProfile.chefInfo.createdDate,
                      })}>
                      {userProfile.chefInfo.createdDate
                        ? new Date(
                            userProfile.chefInfo.createdDate,
                          ).toLocaleDateString()
                        : "Invalid date"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                      Approval Date
                    </p>
                    <p
                      className={cn("font-medium", {
                        "italic text-muted-foreground":
                          !userProfile.chefInfo.approvalDate,
                      })}>
                      {userProfile.chefInfo.approvalDate
                        ? new Date(
                            userProfile.chefInfo.approvalDate,
                          ).toLocaleDateString()
                        : "Invalid date"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed py-8">
                  <p className="max-w-[240px] text-center text-muted-foreground">
                    Share your culinary expertise with our community
                  </p>
                  <ButtonRequestChef refetch={refetch} />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfileInfo;
