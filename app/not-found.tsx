"use client";
import { BlackButton } from "@/components/buttons";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";

export default function NotFound() {
  return (
    <section className="min-w-screen h-screen min-h-screen bg-themeIvory">
      <Navbar />
      <div className="flex h-5/6 w-full items-center justify-center gap-5 text-themeBrown lg:h-full">
        <div>
          <div className="text-center text-6xl">🙈</div>
          <div className="mt-2">Our monkeys can&apos;t locate you!</div>
          <div className="mt-2 flex justify-center">
            <BlackButton
              style={{ paddingTop: "8px", paddingBottom: "8px" }}
              onClick={() => {
                redirect("/");
              }}
            >
              Return Home
            </BlackButton>
          </div>
        </div>
      </div>
    </section>
  );
}
