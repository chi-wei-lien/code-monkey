// import MenuContent from "./menu.mdx";
import { robotoMono } from "../fonts";

const Menu = () => {
  return (
    <div className="h-[95%] w-[30rem] overflow-y-scroll bg-cardPrimary pt-4 rounded-md shadow">
      <div
        className={`prose-menu prose-ul:list-none text-fontMenu text-sm list-none ${robotoMono.className} font-medium`}
      >
        {/* <MenuContent /> */}
      </div>
    </div>
  );
};

export default Menu;
