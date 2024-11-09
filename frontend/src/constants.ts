import Prism from "prismjs";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-clike";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-markdown.js";

export const NONE = 0;
export const BEGINNER = 1;
export const EASY = 2;
export const MEDIUM = 3;
export const HARD = 4;
export const ADVANCED = 5;

export const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

export const DEFAULT_LANG = "Language";

export const LANGUAGE_MAP: Record<string, [string, Prism.Grammar]> = {
  Javascript: ["javascript", Prism.languages.javascript],
  Python: ["python", Prism.languages.python],
  Java: ["java", Prism.languages.java],
  "C++": ["clike", Prism.languages.clike],
};
