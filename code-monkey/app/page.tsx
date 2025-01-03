"use client";
import { BlackButton, PrimaryButton } from "@/components/buttons";
import Navbar from "@/components/navbar";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  const router = useRouter();
  return (
    <section className="min-w-screen min-h-screen bg-themeIvory lg:h-screen">
      <Navbar />
      <div className="flex h-full w-full items-center justify-center gap-5 px-8 text-themeBrown lg:pt-20">
        <div>
          <h1 className="text-6xl">Code Monkey</h1>
          <h1 className="mt-3 text-xl">Making coding interview prep</h1>
          <TypeAnimation
            sequence={["fun", 1000, "interesting", 1000, "collaborative", 1000]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1.75em", display: "inline-block" }}
            repeat={Infinity}
          />
          <div className="mt-3 flex gap-2">
            <PrimaryButton onClick={() => router.push("/interview-guide")}>
              Interview Guide
            </PrimaryButton>
            <BlackButton onClick={() => router.push("/leetcode-colab")}>
              Leetcode Colab
            </BlackButton>
          </div>
          <div className="mt-3 flex w-full justify-center">
            <div className="h-52 w-52">
              <DotLottieReact
                src="https://lottie.host/50e664d4-0788-4eaf-940a-6e76ed639a8a/H4uzpvDt4s.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
