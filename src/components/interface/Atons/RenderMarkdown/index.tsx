import ReactMarkdown from 'react-markdown';
import CodeBlock from './elements/CodeBlock';
import { Codepen } from './elements/codepen';
import ParagraphRenderer from './elements/ParagraphRenderer';
import { Blockquote } from './elements/Blockquote';

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

  const isLinkOrEmbed = ({ children, href }: any) => {
    const codepenEnbend = 'https://codepen.io/lucasfernandodev/pen/';

    if (children[0] === 'embed') {
      if (href.includes(codepenEnbend)) return <Codepen url={href} />;
    }

    return (
      <a href={href} target='_blank' className='iCustomLink' rel='noreferrer'>
        {children}
      </a>
    );
  };

  return (
    <ReactMarkdown
      components={{
        code: CodeBlock as any,
        p: proxyParagraphRenderer,
        a: isLinkOrEmbed,
        blockquote: Blockquote,
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
