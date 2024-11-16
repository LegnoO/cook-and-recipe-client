// ** Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DefaultLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="default-layout">
      <Navbar />
      {modal}
      {children}
      <Footer />
    </div>
  );
}
