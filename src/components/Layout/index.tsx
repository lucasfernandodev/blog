import style from './style.module.css';
import { WithChildren } from '../../types/componentChildren';
import Container from './Container';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';
import Head from '../Utils/Head';
import {useRouter} from 'next/router';
import { defaultDescription } from '../../../config/blog';

interface LayoutProps {
  title?: string;
  description?: string;
  cover?: string,
  type?: 'website' | 'article',
  hero?: {
    type?: 'image' | 'color' | undefined,
    bg?: string | undefined,
    title?:string,
    description?:string | null,
    hide?: boolean  
  },
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
        {typeof hero !== 'undefined' && (
          <>
            {
              hero.type === 'image' ? 
                <Hero data-hide={hero.hide} image={hero.bg} title={hero?.title}  description={hero?.description}/> : 
                <Hero data-hide={hero.hide} color={hero.bg} title={hero.title}  description={hero?.description} />
            }
          </>
        )}
        
        {
          typeof hero === 'undefined' && <Hero title='Blog do Lucas Fernando' description={defaultDescription} />
        }
        
        <Container width="sm" className={style.wrapper}>{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
