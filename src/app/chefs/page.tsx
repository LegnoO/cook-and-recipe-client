// ** Next Imports
import { headers } from "next/headers";

// ** Components
import BannerLog from "@/components/BannerLog";
import Repeat from "@/components/Repeat";
import PaginationServer from "@/components/Pagination/PaginationServer";
import ChefCard from "./ChefCard";

// ** Types
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// async function getChef() {
//   const response = await serverFetch(`/users/owned/profile`);

//   const userInfo = await response.json();
//   return userInfo;
// }

export default function ChefsPage({ searchParams }: Props) {
  const headersList = headers();
  const pathname = headersList.get("x-pathname") || "";

  return (
    <section className="bg-background">
      <BannerLog title="The Team" />
      <div className="section-spacing container">
        <h2 className="mb-16 text-center text-4xl uppercase tracking-widest">
          Chefs
        </h2>
        <div className="grid-cols-3-res">
          <Repeat times={3}>
            <ChefCard />
          </Repeat>
        </div>
        <div className="mt-16">
          <PaginationServer
            endpoint={pathname}
            totalPages={50}
            currentPage={Number(searchParams.index) || 0}
          />
        </div>
      </div>
    </section>
  );
}
