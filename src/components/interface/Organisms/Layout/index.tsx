import { WithChildren } from '@/types/componentChildren';
import Container from './Container';
import Header from './Header';
import Hero, { HeroProps } from './Hero';
import Footer from './Footer';
import Head, { HeadProps } from '@/infra/Head';
import { useRouter } from 'next/router';
import { canonicalUrl } from '../../../../../site.config';

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
  const url = (
    asPath !== 'index' ? canonicalUrl + asPath : canonicalUrl
  ) as string;

  return (
    <>
      <Head {...head} url={head.url !== undefined ? head.url : url} />

      <div>
        <Header />
        {hero && <Hero {...hero} />}

        <Container width='sm'>
          {children}
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
