import Navbar from "@/components/navbar";
import Menu from "./menu";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="md:h-screen min-w-screen bg-bgPrimary">
      <Navbar />
      <div className="pt-16 pl-8 pr-8 h-full flex gap-5 flex-col md:flex-row">
        <div className="">
          <Menu />
        </div>
        <div className="">{children}</div>
      </div>
    </section>
  );
};

export default GuideLayout;
