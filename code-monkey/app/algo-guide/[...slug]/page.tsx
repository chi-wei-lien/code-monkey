"use client";

import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound, useParams } from "next/navigation";
import { pacifico } from "@/app/fonts";
import ImportantMessage from "@/components/mdx/ImportantMessage";
import comparePathWithSlug from "@/lib/comparePathWithSlug";
import InlineCode from "@/components/mdx/InlineCode";
import { useMDXComponents } from "@/mdx-components";
import CustomImage from "@/components/mdx/CustomImage";
import HelpMemorizeMessage from "@/components/mdx/HelpMemorizeMessage";
import PracticeProblems from "@/components/mdx/PracticeProblems";
import FreqLabel from "@/components/FreqLabel";

const TestPage = () => {
  const params = useParams<{ slug: string[] }>();
  const post = allPosts.find((post) =>
    comparePathWithSlug(post._raw.flattenedPath, params.slug)
  );
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="h-[95%] w-full no-scrollbar overflow-y-scroll bg-cardPrimary rounded-md shadow">
      <article className="p-8">
        <div className="flex justify-center">
          <div className={`prose text-black mt-5 text-sm`}>
            <h1
              className={`mt-6 text-fontLogo ${pacifico.className}`}
              id="title"
            >
              {post.title}
            </h1>

            <div className="inline-flex flex-wrap items-center align-middle h-12">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span className="mx-1">{">"}</span>
              {post._raw.flattenedPath
                .split("/")
                .slice(0, -1)
                .map((pathComponent, i) => (
                  <span key={i}>
                    {pathComponent.replace(/^\d+\s/, "")}
                    <span className="mx-1">{">"}</span>
                  </span>
                ))}
              <span>{post.title}</span>
            </div>
            <div className="flex gap-2 items-center mb-4">
              <div>{post.freq && FreqLabel(post.freq)}</div>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=chi-wei-lien&repo=cs348-project&type=star&count=true"
                width="75"
                height="20"
                title="GitHub"
              />
              <iframe
                src="https://ghbtns.com/github-btn.html?user=chi-wei-lien&repo=cs348-project&type=fork&count=true"
                width="75"
                height="20"
                title="GitHub"
              />
            </div>
            <div className="border-dashed border-2 border-sky-500 p-4 rounded-md">
              <div className="text-lg font-bold text-fontLogo">
                On this page
              </div>
              <div>
                {post.headings.map(
                  (heading: { slug: string; text: string; level: number }) => {
                    return (
                      <div key={heading.slug}>
                        <a
                          className="data-[level=two]:pl-2 data-[level=three]:pl-4 data-[level=four]:pl-6"
                          data-level={heading.level}
                          href={`#${heading.slug}`}
                        >
                          {heading.text}
                        </a>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className={`${post.done == false ? "hidden" : "block"}`}>
              <MDXContent
                components={useMDXComponents({
                  ImportantMessage,
                  InlineCode,
                  CustomImage,
                  HelpMemorizeMessage,
                  PracticeProblems,
                })}
              />
            </div>

            {/* )} */}
            {post.done == false && <h3 className="mt-4">Coming soon!</h3>}
          </div>
        </div>
        <a
          href="#title"
          className="fixed bottom-5 right-8 bg-slate-700 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition"
        >
          Back to Top
        </a>
      </article>
    </div>
  );
};

export default TestPage;
