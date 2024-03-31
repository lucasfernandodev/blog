import { FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { JetBrains_Mono } from 'next/font/google';
import style from './style.module.css';
import '../../styles/custom-code-block-style.css';

interface IProps {
  language: string,
  codestring: string
  className?: string | undefined;
  caption?: string;
}

const jet = JetBrains_Mono({
  weight: "400",
  subsets: ['latin'],
  display: 'swap',
})

export const CodeBlock: FC<IProps> = ({ language, caption, className, codestring }) => {
  return (
    <div className={style.codeblock}>
      <div className={style.headding} data-active={caption ? true : false}>{caption}</div>
      <SyntaxHighlighter
        showLineNumbers={true}
        wrapLines={true}
        className={[className, jet.className].join(" ")}
        style={{}}
        language={language}
        PreTag="div"
      >
        {codestring}
      </SyntaxHighlighter>
    </div>
  )
}
