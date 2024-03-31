import style from './style.module.css';
import { ReactMarkdownComponents } from '@/types/react-markdown-custom-components';
import ReactMarkdown from 'react-markdown';
import { Codepen } from '../Codepen';
import { CodeBlock } from '../CodeBlock';
import { CodeProxy } from './proxy/code';
import {AnchorProxy} from './proxy/anchor';
import { ParagraphProxy } from './proxy/paragraph';

interface IProps {
  content: string
}

const customComponent: ReactMarkdownComponents = {
  ...CodeProxy({ CustomComponent: CodeBlock }),
  ...ParagraphProxy(),
  ...AnchorProxy({CustomComponent: Codepen})
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