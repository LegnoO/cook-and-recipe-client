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
import { Button } from "@/components/ui/button";

// ** Icons
import { Facebook, Instagram, Linkedin } from "@/components/ui/icons";

// ** Types
type Props = { chef: Chef };

const ChefCard = ({ chef }: Props) => {
  const socialIcons = [
    {
      icon: <Facebook className="h-4 w-4" />,
      href: "#",
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: "#",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "#",
    },
  ];

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-0">
        <Image
          className="mx-auto aspect-square w-full rounded-full object-cover"
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
      <CardFooter className="justify-center p-0">
        <div className="flex gap-2">
          {socialIcons.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              asChild
              className="hover:bg-background">
              <Link scroll={false} href={item.href}>
                {item.icon}
              </Link>
            </Button>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChefCard;
