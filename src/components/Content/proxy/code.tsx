import { ReactMarkdownComponents } from "../../../types/react-markdown-custom-components"
import style from '../style.module.css';

interface ICodeProxy {
  CustomComponent: (props: {
    language: string,
    codestring: string
    className?: string | undefined;
    caption?: string;
  }) => React.ReactNode
}

function clearText(children: React.ReactNode, toDeleted?: string): string {
  const codestring = String(children).replace(/\n$/, '');
  if (toDeleted) {
    return codestring.replaceAll(toDeleted, '');
  }

  return codestring;
}

export const CodeProxy = ({ CustomComponent }: ICodeProxy): ReactMarkdownComponents => {
  return {
    code({ children, className, ...rest }) {
      const match = /language-(\w+)/.exec(className || '')

      const [captionRaw] = /\[caption=(.*?)\]/.exec(String(children) || '') || [];

      const codestring = clearText(children, captionRaw);
      const caption = captionRaw ? captionRaw.split("=")[1].replace("]", "") : undefined

      return match ? (
        <CustomComponent
          {...rest}
          className={style.codeblock}
          codestring={codestring}
          language={match[1]}
          caption={caption}
        />
      ) : (
        <code className={className}>
          {children}
        </code>
      )
    }
  }
}