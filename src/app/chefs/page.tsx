// ** React Imports
import { Fragment } from "react";

// ** Components
import Repeat from "@/components/Repeat";
import ChefCard from "./ChefCard";

// ** Types
// type Props = {
//   searchParams: SearchParams;
// };

export default function ChefsPage() {
  return (
    <Fragment>
      <section className="bg-chefs-banner relative max-w-full bg-cover bg-center bg-no-repeat">
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
          <h2 className="mb-4 text-center text-4xl uppercase tracking-widest">
            Chefs
          </h2>
          <div className="mx-auto mb-24 h-[2px] w-[4%] bg-primary" />
          <div className="grid-cols-3-res place-items-center gap-8">
            <Repeat times={3}>
              <ChefCard />
            </Repeat>
          </div>
        </div>
      </section>
    </Fragment>
  );
}
