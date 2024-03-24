import style from './style.module.css';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface IProps {
  content: string
}

const CodeBlock = ({ language, codestring }: { language: string, codestring: string }) => {
  return (
    <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  )
}


export const Content = ({ content }: IProps) => {
  return (
    <div className={style.content}>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <CodeBlock
                codestring={String(children).replace(/\n$/, '')}
                language={match[1]}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}>
        {content}
      </ReactMarkdown>
    </div>
  )
}