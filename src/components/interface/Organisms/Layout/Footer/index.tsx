import { Instagram, LinkedIn,Github } from '../../../../../lib/icons';
import Link from '@/infra/Link';
import Container from '../Container';
import style from './style.module.css';

const Footer = () => {
  return (
    <div className={style.footer}>
      <Container>
        <div className={style.wrapper}>
          <span>
            Desenvolvido com ❤️ por <a href="https://github.com/lucasfernandodev">Lucas Fernando</a>.
          </span>

          <ul>
            <li>
              <Link href="https://github.com/lucasfernandodev">
                <Github />
              </Link>
            </li>
            <li>
              <Link href="https://www.instagram.com/lucasfernandodev/">
                <Instagram />
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/frontlucasfernandodev/">
                <LinkedIn />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
