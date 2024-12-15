import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { withContentlayer } from "next-contentlayer";
import rehypeHighlight from "rehype-highlight";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
//   extension: /\.mdx?$/,
//   options: {
//     rehypePlugins: [rehypeHighlight],
//   },
// });

// export default withMDX(withContentlayer(nextConfig));
export default withContentlayer(nextConfig);
