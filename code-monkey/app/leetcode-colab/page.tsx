"use client";

import { getGroups } from "@/lib/api/group/getGroups";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DefaultPage = () => {
  useEffect(() => {
    const redirectGroup = async () => {
      const groups = await getGroups();
      if (groups) {
        redirect(`/leetcode-colab/${groups[0].group_id}`);
      }
    };

    redirectGroup();
  }, []);

  return (
    <div className="flex h-full flex-col justify-between gap-5 lg:flex-row">
      <div className="h-fit overflow-y-scroll rounded-md bg-cardPrimary p-10 shadow lg:h-[95%] lg:w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div>
            <h1 className="text-center text-2xl text-themeBrown">
              One monkey will process your request soon...
            </h1>
            <DotLottieReact
              src="https://lottie.host/fa84cd99-e943-4b50-acd4-e41e1324f6df/QlA8TUWh74.lottie"
              loop
              autoplay
              speed={2}
            />
          </div>
        </div>
      </div>
      <div className="no-scrollbar min-h-28 overflow-y-scroll rounded-md p-6 pb-4 lg:h-[95%] lg:min-w-[20rem]"></div>
    </div>
  );
};

export default DefaultPage;
