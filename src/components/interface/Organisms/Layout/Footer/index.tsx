import { Instagram, LinkedIn, Github } from '../../../../../lib/icons';
import Link from '@/infra/Link';
import Container from '../Container';
import style from './style.module.css';

const Footer = () => {
  return (
    <div className={style.footer}>
      <Container>
        <div className={style.wrapper}>
          <span className={style.author}>
            Desenvolvido com ❤️ por{' '}
            <a href='https://github.com/lucasfernandodev'>Lucas Fernando</a>.
          </span>

          <ul>
            <li>
              <Link href='https://github.com/lucasfernandodev'>
                <Github aria-hidden={true} />
                <span className={style.hiddenText}>github</span>
              </Link>
            </li>
            <li>
              <Link href='https://www.instagram.com/lucasfernandodev/'>
                <Instagram aria-hidden={true} />
                <span className={style.hiddenText}>instagram</span>
              </Link>
            </li>
            <li>
              <Link href='https://www.linkedin.com/in/frontlucasfernandodev/'>
                <LinkedIn aria-hidden={true} />
                <span className={style.hiddenText}>linkedin</span>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
