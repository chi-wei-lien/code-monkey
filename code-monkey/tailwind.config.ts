import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bgPrimary: "#EAE6E6",
        fontLogo: "#535151",
        cardPrimary: "#F3F0F0",
        fontMenu: "#464646",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "80ch",
          },
        },
        menu: {
          css: {
            ul: {
              marginLeft: "0.5rem",
              paddingLeft: "0.5rem",
              paddingBottom: "0.5rem",
            },
            li: {
              paddingTop: "0.5rem",
            },
            a: {
              paddingLeft: "0.5rem",
              paddingRight: "0.5rem",
              textDecoration: "none",
              "&:hover": {
                backgroundColor: "#E8E8E8",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), flowbite.plugin()],
} satisfies Config;
