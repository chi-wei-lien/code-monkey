import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";

const CustomH1 = (props: { props: ReactNode }) => (
  <h1
    style={{
      marginTop: 40,
      marginBottom: 10,
      fontSize: "1.4rem",
      color: "#535151",
    }}
    {...props}
  />
);

const CustomH2 = (props: { props: ReactNode }) => (
  <h2
    style={{
      marginTop: 20,
      marginBottom: 10,
      fontSize: "1.2rem",
      color: "#535151",
    }}
    {...props}
  />
);

const CustomH3 = (props: { props: ReactNode }) => (
  <h3
    style={{
      marginTop: 20,
      marginBottom: 10,
      fontSize: "1rem",
      color: "#535151",
    }}
    {...props}
  />
);

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: CustomH1,
    h2: CustomH2,
    h3: CustomH3,
  };
}
