// ** React Imports
import { Fragment } from "react";

// ** Components
import ChefCard from "./ChefCard";
import Breadcrumb from "@/components/Breadcrumb";
import Pagination from "@/components/Pagination";
import QueryChef from "./QueryChef";

// ** Services
import { getChefList } from "@/services/server/chefService";

// ** Types
type Props = {
  searchParams: SearchParams;
};

export default async function ChefsPage({ searchParams }: Props) {
  const pageIndex = Number(searchParams.index);
  const { data: chefs, paginate } = await getChefList({
    index: searchParams.index || "1",
    sortOrder: searchParams.sortOrder || "asc",
    size: "8",
    ...searchParams,
  });

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
        <div className="flex h-full min-h-screen flex-col py-16">
          <div className="container flex flex-1 flex-col justify-between">
            <div className="flex flex-1 flex-col">
              <div className="mb-4">
                <Breadcrumb
                  items={[
                    { title: "Home", href: "/" },
                    { title: "Chefs", href: "/chefs" },
                  ]}
                />
              </div>
              <h1 className="mb-6 text-4xl font-semibold">Chefs</h1>
              <div className="mb-6 py-4 pt-3">
                <QueryChef />
              </div>
              <div className="flex flex-1 items-center justify-center">
                {chefs.length > 0 ? (
                  <div className="grid-cols-4-res gap-20">
                    {chefs.map((chef, index) => (
                      <ChefCard key={index} chef={chef} />
                    ))}
                  </div>
                ) : (
                  <p className="font-medium text-muted-foreground">
                    No chefs found
                  </p>
                )}
              </div>
            </div>
            {/* <h1 className="mb-4 text-center text-4xl uppercase tracking-widest">
            Chefs
          </h1>
          <div className="mx-auto mb-24 h-[2px] w-[4%] bg-primary" /> */}

            <div className="mt-24">
              <Pagination totalPages={paginate.total} currentPage={pageIndex} />
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
