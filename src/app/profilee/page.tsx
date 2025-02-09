// ** Next Imports
import type { Metadata } from "next";

// ** Components
import Collection from "./_components/Collection";
import UserInfo from "./_components/UserInfo";

import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "View and manage your shared recipes on Cook & Recipe. Showcase your culinary creations and cooking skills.",
};

export default async function Profile() {
  return (
    <div className="container my-[35px] space-y-8 p-4">
      <div className="flex flex-col items-stretch gap-8 md:flex-row">
        <div className="w-full md:w-[30%]">
          <Suspense fallback={<>test UserInfo</>}>
            <UserInfo />
          </Suspense>
        </div>
        <div className="w-full md:w-[70%]">
          <Suspense fallback={<>test Collection</>}>
            <Collection />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
