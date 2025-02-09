// ** React Imports
import { ReactNode } from "react";

// ** Components
import Sidebar from "@/components/Sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-y-scroll p-8">{children}</main>
      </div>
    </div>
  );
}
