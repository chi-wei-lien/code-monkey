import Banner from "./Banner";
import Footer from "./Footer";

interface BaseLayoutProps {
  Header: React.ReactNode;
  Content: React.ReactNode;
}

const BaseLayout = ({ Header, Content }: BaseLayoutProps) => {
  return (
    <div>
      <div className="min-h-screen">
        <Banner />
        <div className="flex flex-col p-10 mb-20">
          <div className="p-1.5 min-w-full flex justify-center">
            <div className="w-full rounded-lg max-w-3/4 md:max-w-screen-lg">
              {Header}
            </div>
          </div>
          <div className="-m-1.5">
            <div className="p-1.5 min-w-full flex justify-center">
              <div className="w-full overflow-x-auto rounded-lg max-w-3/4 md:max-w-screen-lg">
                <div className="min-h-60">{Content}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
