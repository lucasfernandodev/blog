import { Instagram, LinkedIn, Github } from '../../../../../lib/icons';
import Container from '../Container';
import style from './style.module.css';
import { Author } from '@/Atons/Author';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Container>
        <div className={style.wrapper}>
          <span className={style.author}>
            Desenvolvido com ❤️ por <Author />.
          </span>

          <ul>
            <li>
              <a
                href='https://github.com/lucasfernandodev'
                rel='noreferrer'
                target='_blank'
              >
                <Github aria-hidden={true} />
                <span className={style.hiddenText}>github</span>
              </a>
            </li>
            <li>
              <a
                href='https://www.instagram.com/lucasfernandodev/'
                target='_blank'
                rel='noreferrer'
              >
                <Instagram aria-hidden={true} />
                <span className={style.hiddenText}>instagram</span>
              </a>
            </li>
            <li>
              <a
                href='https://www.linkedin.com/in/frontlucasfernandodev/'
                target='_blank'
                rel='noreferrer'
              >
                <LinkedIn aria-hidden={true} />
                <span className={style.hiddenText}>linkedin</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
