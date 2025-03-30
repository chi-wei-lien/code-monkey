import Navbar from "@/components/navbar";
import Menu from "./menu";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-w-screen min-h-screen bg-themeIvory lg:h-screen">
      <Navbar />
      <div className="flex h-full flex-col gap-5 pl-8 pr-8 pt-5 lg:flex-row lg:justify-between lg:pt-20">
        <Menu />
        <div className="w-full">{children}</div>
        <div className="lg:w-[20rem]"></div>
      </div>
    </section>
  );
};

export default GuideLayout;
