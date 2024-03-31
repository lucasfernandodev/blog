import { ReactMarkdownComponents } from "@/types/react-markdown-custom-components"

interface IAnchorProxy {
  CustomComponent: (props: { url: string }) => React.ReactNode
}

export const AnchorProxy = ({ CustomComponent }: IAnchorProxy): ReactMarkdownComponents => {
  return {
    a({ children, href }) {
      const codepenUrl = 'https://codepen.io/lucasfernandodev/pen/';
      if (children === 'embed' && href) {
        if (href.includes(codepenUrl)) return <CustomComponent url={href} />;
      }

      return (
        <a href={href} target='_blank' rel='noreferrer'>
          {children}
        </a>
      );
    },
  }
}