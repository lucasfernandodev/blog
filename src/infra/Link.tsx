import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { WithChildren } from '../types/componentChildren';


interface LinkProps extends NextLinkProps{
  className?: string | undefined
}

const Link = ({children,className, href, ...args}: WithChildren<LinkProps>) => {
  return (
    <NextLink href={href} legacyBehavior>
      <a  {...args} className={className}>{children}</a>
    </NextLink>
  );
};

export default Link;