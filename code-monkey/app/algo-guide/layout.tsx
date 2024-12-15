import Navbar from "@/components/navbar";
import Menu from "./menu";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-screen min-w-screen bg-bgPrimary">
      <Navbar />
      <div className="pt-16 pl-8 h-full flex">
        <Menu />
        {children}
      </div>
    </section>
  );
};

export default GuideLayout;
