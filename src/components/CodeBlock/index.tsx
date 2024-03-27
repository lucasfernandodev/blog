import { FC } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface IProps{
  language: string,
  codestring: string
}

export const CodeBlock: FC<IProps> = ({ language, codestring }) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  )
}
