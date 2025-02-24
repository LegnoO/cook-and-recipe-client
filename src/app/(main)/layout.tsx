// ** React Imports
import { ReactNode } from "react";

// ** components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
