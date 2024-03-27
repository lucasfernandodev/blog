import { ReactMarkdownComponents } from '@/types/react-markdown-custom-components';
import style from './style.module.css';
import ReactMarkdown from 'react-markdown';

import { CodeBlock } from '../CodeBlock';


interface IProps {
  content: string
}

const customComponent: ReactMarkdownComponents = {
  code(props) {
    const {children, className, ...rest} = props
    const match = /language-(\w+)/.exec(className || '')
    return match ? (
      <CodeBlock
        {...rest}
        PreTag="div"
        codestring={String(children).replace(/\n$/, '')}
        language={match[1]}
      />
    ) : (
      <code {...rest} className={className}>
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