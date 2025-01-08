// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Image from "next/image";
import Link from "next/link";

// ** Components
import RecipeCard from "@/components/RecipeCard";
import { Button } from "@/components/ui/button";

// ** Icons
import { Facebook, Instagram, Linkedin } from "@/components/ui/icons";
import { MoveUpRight } from "lucide-react";
import { getChefDetail, getOwnRecipe } from "@/services/server/chefService";

// ** Types
type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  console.log("generateStaticParams");
  return [
    {
      id: "test",
    },
  ];
}

export async function generateMetadata({ params }: Props) {
  const chef = await getChefDetail(params.id);

  if (!chef) {
    return {
      title: "Chef Not Found",
    };
  }

  return {
    title: `${chef.userInfo.fullName}`,
    description: chef.description,
    openGraph: {
      images: [{ url: chef.userInfo.avatar }],
    },
  };
}

export default async function SingleChefPage({ params }: Props) {
  console.log("🚀 ~ SingleChefPage ~ params:", params);
  const chef = await getChefDetail(params.id);
  const { data: recipes } = await getOwnRecipe(params.id);

  return (
    <Fragment>
      <section className="py-16">
        <div className="container flex flex-col items-center justify-center md:flex-row md:items-start md:gap-12">
          <div className="mb-8">
            <Image
              className="mx-auto aspect-square h-[192px] rounded-lg object-cover"
              width={192}
              height={192}
              src={
                chef.userInfo.avatar ||
                "https://res.cloudinary.com/dzl5ur69n/image/upload/v1733600651/yyhtnniclx0ja0n2pjhq.jpg"
              }
              alt={chef.userInfo.fullName}
            />
          </div>

          <div className="flex flex-1 flex-col">
            <div className="mb-5 flex-1 text-center md:text-left">
              <h1 className="mb-4 text-4xl font-bold">
                {chef.userInfo.fullName}
              </h1>
              <div className="mb-6 text-lg text-muted-foreground">
                {chef.level}
              </div>
            </div>

            <div className="mb-8 flex gap-3 p-0 text-muted-foreground">
              <Facebook size={18} />
              <Instagram size={18} />
              <Linkedin size={18} />
            </div>
            <div className="max-w-2xl">
              <h2 className="mb-2 text-base font-medium tracking-widest lg:text-lg">
                About me
              </h2>
              <p className="text-sm tracking-wider text-muted-foreground lg:text-base">
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
      </section>
      <section className="bg-background py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-4xl font-bold tracking-wider lg:text-3xl">
              {`${chef.userInfo.fullName}'s`} Recipes
            </h2>
            <Link href="/chefs">
              <Button>
                View more
                <MoveUpRight />
              </Button>
            </Link>
          </div>
          <div className="grid-cols-3-res gap-8">
            {(recipes as Recipe[]).map((recipe, index) => (
              <RecipeCard recipe={recipe} key={index} />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
