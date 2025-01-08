// ** Next Imports
import Link from "next/link";
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

// ** Types
type Props = { chef: Chef };

const ChefCard = ({ chef }: Props) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0">
        <Image
          className="mx-auto aspect-square w-full rounded-md object-cover"
          width={200}
          height={200}
          src={
            chef.userInfo.avatar ||
            "https://res.cloudinary.com/dzl5ur69n/image/upload/v1733600651/yyhtnniclx0ja0n2pjhq.jpg"
          }
          alt={chef.userInfo.fullName}
        />
      </CardHeader>
      <CardContent className="mt-6 p-0 text-center">
        <Link href={`/chefs/${chef.id}`}>
          <CardTitle className="mb-4 text-base font-semibold uppercase tracking-widest">
            {chef.userInfo.fullName}
          </CardTitle>
          <CardDescription className="font-medium uppercase tracking-widest">
            {chef.level}
          </CardDescription>
        </Link>
        <p className="mt-5 text-center text-sm font-normal leading-6 tracking-normal text-muted-foreground">
          {chef.description}
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
