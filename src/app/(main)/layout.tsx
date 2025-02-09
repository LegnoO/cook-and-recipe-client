// ** React Imports
import { ReactNode } from "react";

// ** components
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {modal}
        {children}
      </main>
      <Footer />
    </div>
  );
}
