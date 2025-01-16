// ** Next Imports
import { Metadata } from "next";

// ** Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

// ** Context
import { AuthProvider } from "@/context/AuthProvider";
import ReactQueryProvider from "@/context/ReactQueryProvider";

// ** Library Imports
import NextTopLoader from "nextjs-toploader";

// ** Lib
import { raleway, playfair } from "@/lib/font";

// ** CSS
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Cook & Recipe",
    default: "Cook & Recipe - Share Your Culinary Creations",
  },
  description:
    "Discover and share delicious recipes with our cooking community. From beginners to professional chefs, everyone is welcome to explore and contribute.",
  keywords: [
    "cooking",
    "recipes",
    "food",
    "culinary",
    "chefs",
    "cooking community",
  ],
  authors: [{ name: "Cook & Recipe Team" }],
  creator: "Cook & Recipe",
  publisher: "Cook & Recipe",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html className="" lang="en">
      <body
        className={`${playfair.variable} w-screen ${raleway.variable} antialiased`}>
        <NextTopLoader
          height={3}
          color="hsl(var(--primary))"
          showSpinner={false}
        />
        <Toaster />
        <ReactQueryProvider>
          <AuthProvider>
            <div className="flex flex-col">
              <Navbar />
              {modal}
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
