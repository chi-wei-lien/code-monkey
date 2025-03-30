"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  router.push("/interview-guide/Getting%20Started");
  return <div></div>;
};

export default Page;
