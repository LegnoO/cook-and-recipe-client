// ** Next Imports

import Link from "next/link";

// ** Components
import {
  Facebook,
  Instagram,
  Logo,
  Reddit,
  Twitter,

} from "@/components/ui/icons";

const Footer = () => {
  const navRoute = [
    { href: "/", title: "Home" },
    { href: "/chefs", title: "Chefs" },
    { href: "/recipes", title: "Recipes" },
    { href: "/contact", title: "Contact" },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-8">

          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-1">
              <Logo size={40} className="text-background" />
              <h2 className="font-playfair text-2xl font-bold text-background">
                Cook & Recipe
              </h2>
            </div>
            <p className="mb-4 text-gray-400">
              Discover the flavors of life through every recipe. We are the
              place where culinary passion meets creativity in your kitchen.
            </p>
            <ul className="flex space-x-4 text-gray-400">
              <li className="cursor-pointer transition-colors">
                <Facebook size={24} />
              </li>

              <li className="cursor-pointer transition-colors">
                <Instagram size={24} />
              </li>
              <li className="cursor-pointer transition-colors">
                <Twitter size={24} />
              </li>

              <li className="cursor-pointer transition-colors">
                <Reddit size={24} />
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
            <ul className="space-y-2">
              {navRoute.map(({ href, title }, index) => (
                <li key={index}>
                  <Link
                    href={href}
                    className="text-gray-400 transition-colors hover:text-gray-300">
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Contact Us</h2>
            <address className="not-italic text-gray-400">
              <p>SILVER LAKE, United States 1941 Late Avenue</p>
              <p>Email: teamcookrecipes@gmail.com</p>
              <p>Phone: +84 0937525531</p>
            </address>
          </div>

        </div>

        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Cook & Recipe. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
