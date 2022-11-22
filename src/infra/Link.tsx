import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { WithChildren } from '@/types/componentChildren';


interface LinkProps extends NextLinkProps{
  className?: string | undefined
  onBlur?: () => void
}

const Link = ({children,onBlur,className, href, ...args}: WithChildren<LinkProps>) => {
  return (
    <NextLink href={href} legacyBehavior onBlur={onBlur}>
      <a  {...args} className={className}>{children}</a>
    </NextLink>
  );
};

export default Link;