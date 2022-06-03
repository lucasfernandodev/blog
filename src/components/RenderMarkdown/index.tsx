import ReactMarkdown from 'react-markdown';
import CodeBlock from './elements/CodeBlock';
import ParagraphRenderer from './elements/ParagraphRenderer';

interface RenderMarkdownProps {
  markdown: any;
  stylePage: any;
}

const RenderMarkdown = ({ markdown, stylePage }: RenderMarkdownProps) => {
  const proxyParagraphRenderer = ({ children }: { children: any }) => {
    return (
      <ParagraphRenderer className={stylePage.paragraph}>
        {children}
      </ParagraphRenderer>
    );
  };

  return (
    <ReactMarkdown
      components={{
        code: CodeBlock as any,
        p: proxyParagraphRenderer,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
