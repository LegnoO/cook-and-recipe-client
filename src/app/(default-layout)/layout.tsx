// ** Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="default-layout">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
