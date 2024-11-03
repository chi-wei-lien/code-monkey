import Banner from "./Banner";

interface BaseLayoutProps {
  Header: React.ReactNode;
  Content: React.ReactNode;
}

const BaseLayout = ({ Header, Content }: BaseLayoutProps) => {
  return (
    <div>
      <Banner />
      <div className="flex flex-col p-10">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full flex justify-center">
            <div className="w-full rounded-lg max-w-3/4 md:max-w-screen-lg">
              <div className="">{Header}</div>
              <div className="min-h-60">{Content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
