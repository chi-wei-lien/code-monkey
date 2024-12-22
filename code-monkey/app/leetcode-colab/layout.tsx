import Navbar from "@/components/navbar";
import ColabMenu from "./ColabMenu";
import ColabStats from "./ColabStats";

const GuideLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen md:h-screen min-w-screen bg-bgPrimary">
      <Navbar />
      <div className="pt-16 px-8 h-full flex gap-5 flex-col lg:flex-row md:justify-between">
        <ColabMenu />
        <div className="flex-grow h-full overflow-auto">{children}</div>
        <ColabStats />
      </div>
    </section>
  );
};

export default GuideLayout;
