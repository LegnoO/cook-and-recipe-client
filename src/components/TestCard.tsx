import React from "react";

// ** Components
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const TestCard = () => {
  return (
    <Card className="ml-8 mt-8 w-[250px] overflow-hidden border-none shadow-md">
      <CardHeader className="p-2">
        <Image
          className="h-[200px] w-full rounded-xl object-cover"
          src="https://res.cloudinary.com/dzl5ur69n/image/upload/v1728751718/cvscoxzgqltmwnmhdkxl.jpg"
          alt="Recipe "
          width={250}
          height={250}
        />
      </CardHeader>
      {/* <CardContent className=""></CardContent> */}
      {/* <CardTitle className=""></CardTitle> */}
      {/* <CardFooter className=""></CardFooter> */}
    </Card>
  );
};

export default TestCard;
