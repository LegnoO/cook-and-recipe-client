"use server";

import BannerLog from "@/components/BannerLog";
import Repeat from "@/components/Repeat";
import Image from "next/image";

export default async function TestPage() {
  return (
    <div className="bg-background">
      <BannerLog title="Our Chefs" />
      <div className="container py-20">
        <h2 className="mb-10 text-center text-4xl font-bold tracking-wider">
          Meet Our Professional Chefs
        </h2>
        <div className="grid-cols-3-res grid gap-x-6 gap-y-10">
          <Repeat times={9}>
            <div className="flex flex-col">
              <div className="relative rounded-md">
                <Image
                  priority
                  className="rounded-inherit"
                  width={389}
                  height={389}
                  src={
                    "https://res.cloudinary.com/dzl5ur69n/image/upload/v1733600651/yyhtnniclx0ja0n2pjhq.jpg"
                  }
                  alt={""}
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="mb-1 text-xl font-medium">Johnathan</h3>
                <p className="text-sm text-muted-foreground">Master Chef</p>
              </div>
            </div>
          </Repeat>
        </div>
      </div>
    </div>
  );
}
