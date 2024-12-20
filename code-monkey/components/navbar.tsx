import { pacifico } from "@/app/fonts";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-screen relative">
      <div className="absolute pl-8 pt-3">
        <div className="flex items-center gap-7">
          <Link
            href="/"
            className={`${pacifico.className} text-2xl text-fontLogo`}
          >
            🐵 code monkey
          </Link>
          <div className="pt-2">
            <Link href="/algo-guide" className="text-fontLogo font-bold">
              Algo Guide
            </Link>
          </div>
          <div className="pt-2">
            <Link href="/" className="text-fontLogo font-bold">
              LeetCode Colab
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
