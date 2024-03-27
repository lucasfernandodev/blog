import { ReactMarkdownComponents } from '@/types/react-markdown-custom-components';
import style from './style.module.css';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '../CodeBlock';


interface IProps {
  content: string
}

const customComponent: ReactMarkdownComponents = {
  code({ inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    if (!inline && match) {
      return (
        <CodeBlock
          codestring={String(children).replace(/\n$/, '')}
          language={match[1]}
        />
      )
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }
}

export const Content = ({ content }: IProps) => {
  return (
    <div className={style.content}>
      <ReactMarkdown components={customComponent}>
        {content}
      </ReactMarkdown>
    </div>
  )
}