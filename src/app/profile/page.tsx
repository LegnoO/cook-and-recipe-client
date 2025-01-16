// ** Next Imports
import type { Metadata } from "next";

// ** Components
import Collection from "./Collection";
import UserInfo from "./UserInfo";

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
          <UserInfo />
        </div>
        <div className="w-full md:w-[70%]">
          <Collection />
        </div>
      </div>
    </div>
  );
}
