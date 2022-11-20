import style from './style.module.css';
import { WithChildren } from '../../types/componentChildren';
import Container from './Container';
import Header from './Header';
import Hero, { HeroProps } from './Hero';
import Footer from './Footer';
import Head from '../Utils/Head';
import {useRouter} from 'next/router';

interface LayoutProps {
  title?: string;
  description?: string;
  cover?: string,
  type?: 'website' | 'article',
  hero?: HeroProps,
  titleComplet?: boolean
}

const Layout = ({
  children,
  title,
  description,
  cover,
  hero,
  type = 'website',
  titleComplet = false
}: WithChildren<LayoutProps>) => {

  const router = useRouter();

  return (
    <>
      <Head
        pageTitle={title}
        pageDescription={description}
        pageImage={cover}
        pageUrl={router.asPath}    
        pageType={type} 
        titleComplet={titleComplet}
      />

      <div>
        <Header />
        {hero && <Hero {...hero}/>}
        
        <Container width="sm" className={style.wrapper}>{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
