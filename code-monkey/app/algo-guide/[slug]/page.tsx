"use client";

import { allPosts } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound, useParams } from "next/navigation";
import { pacifico } from "@/app/fonts";
import ImportantMessage from "@/components/mdx/ImportantMessage";

const TestPage = () => {
  const params = useParams<{ slug: string }>();
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) notFound();

  const MDXContent = useMDXComponent(post.body.code);

  return (
    <div className="h-[95%] w-[100%] ml-10 mr-10 overflow-y-scroll bg-cardPrimary rounded-md shadow">
      <article className="p-8">
        <div className="flex justify-center">
          <div className={`prose text-black mt-5 text-sm`}>
            <h1
              className={`mt-6 text-fontLogo ${pacifico.className}`}
              id="title"
            >
              {post.title}
            </h1>
            <div className="border-dashed border-2 border-sky-500 p-4">
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
            <MDXContent
              components={{
                ImportantMessage,
              }}
            />
          </div>
        </div>
        <a
          href="#title"
          className="fixed bottom-14 right-16 bg-slate-700 text-white p-3 rounded-full shadow-lg hover:bg-slate-800 transition"
        >
          Back to Top
        </a>
      </article>
    </div>
  );
};

export default TestPage;
