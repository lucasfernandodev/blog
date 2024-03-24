import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import style from './style.module.css';
import Providers from '@/utils/query-provider';

const HomeLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className={style.layout}>
      <Header />
      <Providers>
        {children}
      </Providers>
      <Footer />
    </div>
  )
}

export default HomeLayout