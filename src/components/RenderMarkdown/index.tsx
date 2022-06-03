import ReactMarkdown from "react-markdown";
import CodeBlock from "./Elements/CodeBlock";
import ParagraphRenderer from "./Elements/ParagraphRenderer";

interface RenderMarkdownProps {
  markdown: any;
  stylePage: any;
}

const RenderMarkdown = ({ markdown, stylePage }: RenderMarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        code: CodeBlock as any,
        p: ({ children }) => (
          <ParagraphRenderer className={stylePage.paragraph} >
            {children}
          </ParagraphRenderer>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
