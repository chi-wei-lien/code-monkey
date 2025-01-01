import Navbar from "@/components/navbar";
import Menu from "./menu";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen lg:h-screen min-w-screen bg-themeIvory">
      <Navbar />
      <div className="pt-5 lg:pt-20 pl-8 pr-8 h-full flex gap-5 flex-col lg:flex-row lg:justify-between">
        <Menu />
        <div className="w-full">{children}</div>
        <div className="lg:w-[20rem]"></div>
      </div>
    </section>
  );
};

export default GuideLayout;
