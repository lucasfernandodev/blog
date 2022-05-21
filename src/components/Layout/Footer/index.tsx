import { IconBrandInstagram, IconBrandGithub, IconBrandLinkedin } from "@tabler/icons";
import Link from "../../Utils/Link";
import Container from "../Container";
import style from "./style.module.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <Container>
        <div className={style.wrapper}>
          <span>
            - Por <a href="#">Lucas Fernando</a>.
          </span>

          <ul>
          <li>
              <Link href="#">
                <IconBrandGithub />
              </Link>
            </li>
            <li>
              <Link href="#">
                <IconBrandInstagram />
              </Link>
            </li>
            <li>
              <Link href="#">
                <IconBrandLinkedin />
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
