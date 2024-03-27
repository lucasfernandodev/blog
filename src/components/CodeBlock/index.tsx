import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

interface IProps {
  language: string,
  codestring: string
}

export const CodeBlock = ({ language, codestring }: IProps) => {
  return (
    <SyntaxHighlighter language={language} style={atomDark} PreTag="div">
      {codestring}
    </SyntaxHighlighter>
  )
}
