// ** React Imports
import { ReactNode } from "react";

// ** Components
import Sidebar from "@/components/Sidebar";
import Navbar from "./_components/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Sidebar />
        <main className="relative flex-1 space-y-12 overflow-y-scroll p-8">
          <Navbar />
          {children}
        </main>
      </div>
    </div>
  );
}
