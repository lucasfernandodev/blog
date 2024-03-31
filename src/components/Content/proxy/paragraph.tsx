import { ReactMarkdownComponents } from "../../../types/react-markdown-custom-components"

export const ParagraphProxy = (): ReactMarkdownComponents => {
  return {
    p({ children }) {
      const isEmbed = (item: any) => {
        const isAnchor = item.key && item.key.includes("a") ? true : false;
        const isEmbedType = item.props && item.props.children === 'embed' ? true : false;
        return isAnchor && isEmbedType ? true : false;
      }
  
      if (typeof children === 'string') return <p>{children}</p>
  
      if (isEmbed(children)) return <div>{children}</div>
  
      return <p>{children}</p>
  
    }
  }
}