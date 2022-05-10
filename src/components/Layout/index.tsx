import style from './style.module.css';
import { WithChildren } from '../../types/componentChildren';
import Container from './Container';
import Header from './Header';
import Hero from './Hero';
import Footer from './Footer';




const Layout = ({children,}: WithChildren) => {

  return (
    <div>
     <Header />
      <Hero />
     <Container width='sm'>
     {children}
     </Container>
     <Footer />
    </div>
  )
};

export default Layout;