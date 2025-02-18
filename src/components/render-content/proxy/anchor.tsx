import { ReactMarkdownComponents } from "@/types/react-markdown-custom-components"
import { ownerLinks } from "@/utils/owner-links";

interface IAnchorProxy {
  CustomComponent: (props: { url: string }) => React.ReactNode
}

export const AnchorProxy = ({ CustomComponent }: IAnchorProxy): ReactMarkdownComponents => {
  return {
    a({ children, href }) {

      if (children === 'embed' && href) {
        if (href.includes(ownerLinks.codepen)) {
          return <CustomComponent url={href} />;
        }
      }

      return (
        <a href={href} target='_blank' rel='noreferrer'>
          {children}
        </a>
      );
    },
  }
}