import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { FC } from 'react';

interface LinkProps extends NextLinkProps {
  className?: string | undefined;
  onBlur?: () => void;
  children: React.ReactNode;
}

const Link: FC<LinkProps> = ({
  children,
  onBlur,
  className,
  href,
  prefetch,
  passHref,
  ...args
}) => {
  return (
    <NextLink
      passHref={passHref}
      prefetch={prefetch}
      href={href}
      legacyBehavior
      onBlur={onBlur}
    >
      <a {...args} className={className}>
        {children}
      </a>
    </NextLink>
  );
};

export default Link;
