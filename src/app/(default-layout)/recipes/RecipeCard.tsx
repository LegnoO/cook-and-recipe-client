"use client";

// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Image from "next/image";

// ** Components
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import PaginationCustom from "@/components/PaginationCustom";
import Repeat from "@/components/Repeat";

// ** Icons
import { User } from "lucide-react";

// ** Types
type Props = { data: any };

export default function RecipeCard({ data }: Props) {
  function onPageChange(page: number) {}
  console.log(data);
  return (
    <Fragment>
      <div className="grid-cols-3-res grid gap-8">
        {data.map(({ category, by, name, description, image }, index) => (
          <Card
            key={index}
            className="h-[470px] rounded-lg bg-background shadow-sm transition-shadow hover:shadow-lg">
            <article className="flex flex-col">
              <figure className="relative">
                <Image
                  src={image}
                  alt={""}
                  width={400}
                  height={260}
                  className="h-[260px] w-full rounded-t-lg"
                />
                <Badge className="absolute right-4 top-4 gap-1 rounded-[20px] px-3 py-1">
                  <User className="h-4 w-4" /> <span>by {by}</span>
                </Badge>

                <figcaption className="flex flex-col gap-2.5 px-4 pb-8 pt-4">
                  <span className="font-medium uppercase tracking-wider text-primary">
                    {category}
                  </span>
                  <h4 className="mb-2 line-clamp-2 text-2xl font-bold">
                    {name}
                  </h4>
                  <p className="line-clamp-3 text-muted-foreground">
                    {description}
                  </p>
                </figcaption>
              </figure>
            </article>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <PaginationCustom
          totalPages={50}
          currentPage={1}
          onPageChange={onPageChange}
        />
      </div>
    </Fragment>
  );
}
