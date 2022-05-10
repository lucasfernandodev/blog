import Container from "../Container";
import style from "./style.module.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <Container>
        <div className={style.wrapper}>
          Criado com ❤️ por<a href="#">Lucas Fernando</a>.
        </div>
      </Container>
    </div>
  );
};

export default Footer;
