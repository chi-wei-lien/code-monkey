import Navbar from "@/components/navbar";
import Menu from "./menu";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen md:h-screen min-w-screen bg-bgPrimary">
      <Navbar />
      <div className="pt-16 pl-8 pr-8 h-full flex gap-5 flex-col md:flex-row md:justify-between">
        <Menu />
        <div className="">{children}</div>
        <div className="md:w-[20rem]"></div>
      </div>
    </section>
  );
};

export default GuideLayout;
