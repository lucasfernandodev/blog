import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { WithChildren } from "../../types/componentChildren";


interface LinkProps extends NextLinkProps{

}

const Link = ({children, href, ...args}: WithChildren<LinkProps>) => {
  return (
   <NextLink href={href} {...args}>
     {children}
   </NextLink>
  )
};

export default Link;