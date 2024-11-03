import { useMemo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { LANGUAGE_MAP } from "../constants";

interface CodeProps {
  code: string;
  language?: string;
}

const Code = ({ code, language }: CodeProps) => {
  const langCode = useMemo(() => {
    if (language) {
      const [code, grammar] = LANGUAGE_MAP[language];
      return code;
    }
    return "python";
  }, []);
  return (
    <SyntaxHighlighter language={langCode} style={docco}>
      {code}
    </SyntaxHighlighter>
  );
};

export default Code;
