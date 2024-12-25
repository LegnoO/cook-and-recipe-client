// ** Next Imports
import Image from "next/image";

// ** Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

// ** Icons
import { Facebook, Instagram, Linkedin } from "@/components/ui/icons";

const ChefCard = () => {
  return (
    <Card className="w-full max-w-sm border-none shadow-none">
      <CardHeader className="p-0">
        <div className="relative mx-auto aspect-square w-[200px] overflow-hidden rounded-full">
          <Image
            className="rounded-inherit object-cover"
            fill
            src={
              "https://res.cloudinary.com/dzl5ur69n/image/upload/v1733600651/yyhtnniclx0ja0n2pjhq.jpg"
            }
            alt={""}
          />
        </div>
      </CardHeader>
      <CardContent className="mt-6 text-center">
        <CardTitle className="mb-4 text-base font-semibold uppercase tracking-widest">
          Mason Robinson
        </CardTitle>
        <CardDescription className="font-medium uppercase tracking-widest">
          Master Chef
        </CardDescription>
        <p className="mt-5 text-center text-sm font-normal leading-6 tracking-normal text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur a elit. In ut ullamcorper leo,
          eget euismod orci. Cum sociis natoque penatibus et magnis dis
        </p>
      </CardContent>
      <CardFooter className="justify-center gap-3 p-0 text-muted-foreground">
        <Facebook size={18} />
        <Instagram size={18} />
        <Linkedin size={18} />
      </CardFooter>
    </Card>
  );
};

export default ChefCard;
