// ** React Imports
import { Fragment } from "react";

// ** Components
import ChefCard from "./ChefCard";
import Breadcrumb from "@/components/Breadcrumb";

// ** Services
import { getChefList } from "@/services/server/chefService";
import QueryRecipeBookmarks from "../recipes/bookmark/QueryRecipeBookmarks";

export default async function ChefsPage() {
  const { data: chefs } = await getChefList();

  return (
    <Fragment>
      <section className="relative max-w-full bg-chefs-banner bg-cover bg-center bg-no-repeat">
        <div className="container">
          <div className="flex min-h-screen flex-col items-center justify-center">
            <div className="mt-16 w-full text-center text-background">
              <h2 className="title-slider-responsive mb-6 uppercase">
                the team
              </h2>
              <div className="mx-auto mb-4 h-[2px] w-[4%] bg-primary" />
              <h3 className="description-slider-responsive">
                The talent behind the scenes
              </h3>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-background">
        <div className="section-spacing container">
          <div className="mb-4">
            <Breadcrumb
              items={[
                { title: "Home", href: "/" },
                { title: "Chefs", href: "/chefs" },
              ]}
            />
          </div>
          {/* <h1 className="mb-4 text-center text-4xl uppercase tracking-widest">
            Chefs
          </h1>
          <div className="mx-auto mb-24 h-[2px] w-[4%] bg-primary" /> */}
          <div className="mb-6 py-4 pt-3">
            <QueryRecipeBookmarks />
          </div>
          <div className="grid-cols-4-res gap-20">
            {chefs.map((chef, index) => (
              <ChefCard key={index} chef={chef} />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
