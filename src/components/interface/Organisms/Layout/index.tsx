import { WithChildren } from '@/types/componentChildren';
import Container from './Container';
import Header from './Header';
import Hero, { HeroProps } from './Hero';
import Footer from './Footer';
import Head, { HeadProps } from '@/infra/Head';
import { useRouter } from 'next/router';
import { canonicalUrl } from '../../../../../site.config';
import { useEffect, useState } from 'react';

type HeaderPropsType = Omit<HeadProps, 'url'>;

export interface LayoutHeadProps extends HeaderPropsType {
  url?: string;
}

interface LayoutProps {
  head: LayoutHeadProps;
  hero?: HeroProps;
}

const Layout = ({ head, children, hero }: WithChildren<LayoutProps>) => {
  const { asPath } = useRouter();

  const [tab, setTab] = useState(asPath);
  const url = (asPath !== '/' ? canonicalUrl + asPath : canonicalUrl) as string;

  useEffect(() => {
    setTab(asPath);
  }, [asPath]);

  return (
    <>
      <Head {...head} url={head.url !== undefined ? head.url : url} />

      <div>
        <Header tab={tab} />
        {hero && <Hero {...hero} />}

        <Container width='md'>{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
