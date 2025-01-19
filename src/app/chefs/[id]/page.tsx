// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import RecipeCard from "@/components/RecipeCard";
import Breadcrumb from "@/components/Breadcrumb";

// ** Icons
import { Facebook, Instagram, Linkedin } from "@/components/ui/icons";
import { MoveUpRight } from "lucide-react";

// ** Services
import { getChefDetail } from "@/services/server/chefService";
import { getOwnRecipes } from "@/services/server/recipeService";

// ** Types
type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  try {
    const chefDetail = await getChefDetail(params.id);
    return {
      title: `${chefDetail.userInfo.fullName}`,
      description: chefDetail.description,
      openGraph: {
        images: [{ url: chefDetail.userInfo.avatar }],
      },
    };
  } catch {
    return {
      title: "Chef Not Found",
      description: "The requested chef could not be found.",
    };
  }
}

export default async function SingleChefPage({ params }: Props) {
  const chef = await getChefDetail(params.id);
  const { data: recipes } = await getOwnRecipes(params.id);

  const socialIcons = [
    {
      icon: <Facebook className="h-4 w-4" />,
      href: "#",
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: "#",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "#",
    },
  ];

  return (
    <Fragment>
      <section className="py-16">
        <div className="container">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { title: "Home", href: "/" },
                { title: "Chefs", href: "/chefs" },
                { title: `${chef.userInfo.fullName} Chef Information` },
              ]}
            />
          </div>
          <h1 className="mb-8 text-2xl font-bold md:text-3xl lg:text-4xl">
            Chef Information
          </h1>

          <div className="flex flex-col lg:flex-row">
            <div className="relative aspect-square w-[260px] lg:w-[340px]">
              <Image
                className="absolute h-full w-full rounded-lg object-cover"
                fill
                priority
                src={
                  chef.userInfo.avatar ||
                  "https://res.cloudinary.com/dzl5ur69n/image/upload/v1733600651/yyhtnniclx0ja0n2pjhq.jpg"
                }
                alt={chef.userInfo.fullName}
              />
            </div>

            <div className="flex-1 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold">
                    {chef.userInfo.fullName}
                  </h2>
                  <Badge className="font-semibold" variant="secondary">
                    {chef.level}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  {socialIcons.map((item, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="icon"
                      asChild
                      className="hover:bg-background">
                      <Link scroll={false} href={item.href}>
                        {item.icon}
                      </Link>
                    </Button>
                  ))}
                </div>
                <div className="space-y-2">
                  <h2 className="text-base font-semibold tracking-widest lg:text-xl">
                    About me
                  </h2>
                  <p className="text-sm leading-relaxed tracking-wider text-muted-foreground lg:text-base">
                    {`Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-wider lg:text-3xl">
              {`${chef.userInfo.fullName}'s`} Recipes
            </h2>
            <Link
              href={`/recipes?chefId=${params.id}&chefName=${chef.userInfo.fullName}`}>
              <Button>
                View more
                <MoveUpRight />
              </Button>
            </Link>
          </div>
          {recipes.length > 0 ? (
            <div className="grid-cols-4-res gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard recipe={recipe} key={index} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">
              {"This chef hasn't published any other recipes yet."}
            </p>
          )}
        </div>
      </section>
    </Fragment>
  );
}
