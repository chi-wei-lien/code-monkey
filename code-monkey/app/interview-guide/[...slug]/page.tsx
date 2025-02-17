"use client";

import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound, useParams } from "next/navigation";
import { pacifico } from "@/app/fonts";
import ImportantMessage from "@/components/mdx/important-message";
import comparePathWithSlug from "@/lib/comparePathWithSlug";
import InlineCode from "@/components/mdx/inline-code";
import { useMDXComponents } from "@/mdx-components";
import CustomImage from "@/components/mdx/custom-image";
import HelpMemorizeMessage from "@/components/mdx/help-memorize-message";
import PracticeProblems from "@/components/mdx/practice-problems";
import FreqLabel from "@/components/freq-label";
import Author from "@/components/mdx/author";

const TestPage = () => {
  const params = useParams<{ slug: string[] }>();
  const post = allPosts.find((post) =>
    comparePathWithSlug(post._raw.flattenedPath, params.slug),
  );
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="no-scrollbar h-[95%] w-full overflow-x-auto overflow-y-auto rounded-md bg-cardPrimary shadow">
      <article className="p-8">
        <div className="lg:flex lg:justify-center">
          <div className="prose mt-5 text-sm text-black">
            <h1
              className={`mt-6 text-themeBrown ${pacifico.className}`}
              id="title"
            >
              {post.title}
            </h1>

            <div className="inline-flex h-12 flex-wrap items-center align-middle">
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
            <div className="mb-4 flex items-center gap-2">
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
            {post.show_toc && (
              <div className="rounded-md border-2 border-dashed border-sky-500 p-4">
                <div className="text-lg font-bold text-themeBrown">
                  On this page
                </div>
                <div>
                  {post.headings.map(
                    (heading: {
                      slug: string;
                      text: string;
                      level: number;
                    }) => {
                      return (
                        <div key={heading.slug}>
                          <a
                            className="data-[level=four]:pl-6 data-[level=three]:pl-4 data-[level=two]:pl-2"
                            data-level={heading.level}
                            href={`#${heading.slug}`}
                          >
                            {heading.text}
                          </a>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
            )}
            <div className={`${post.done == false ? "hidden" : "block"}`}>
              <MDXContent
                components={useMDXComponents({
                  ImportantMessage,
                  InlineCode,
                  CustomImage,
                  HelpMemorizeMessage,
                  PracticeProblems,
                  Author,
                })}
              />
            </div>
            {post.done == false && <h3 className="mt-4">Coming soon!</h3>}
          </div>
        </div>
        <a
          href="#title"
          className="fixed bottom-5 right-8 rounded-full bg-slate-700 p-3 text-white shadow-lg transition hover:bg-slate-800"
        >
          Back to Top
        </a>
      </article>
    </div>
  );
};

export default TestPage;
