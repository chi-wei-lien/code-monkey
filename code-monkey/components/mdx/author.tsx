import Image from "next/image";
import { ReactNode } from "react";

interface AuthorProps {
  children: ReactNode;
}

const Author: React.FC<AuthorProps> = ({ children }) => {
  return (
    <div className="rounded-md border-2 border-dashed border-themeBrown bg-yellow-200 p-4">
      <div className="font-bold">About the Author</div>
      <div className="flex items-center justify-between gap-4">
        <div className="w-96">
          <Image
            className="rounded-lg"
            src="/images/me.jpg"
            width={100}
            height={100}
            alt="willy"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Author;
