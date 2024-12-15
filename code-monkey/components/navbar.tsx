import { pacifico } from "@/app/fonts";

const Navbar = () => {
  return (
    <div className="absolute pl-8 pt-3 w-screen">
      <div className={`${pacifico.className} text-2xl text-fontLogo`}>
        🐵 code monkey
      </div>
    </div>
  );
};

export default Navbar;
