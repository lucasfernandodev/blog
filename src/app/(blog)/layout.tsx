import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import style from './style.module.css';

const HomeLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={style.layout}>
      <Header />
        {children}
      <Footer />
    </div>
  )
}

export default HomeLayout