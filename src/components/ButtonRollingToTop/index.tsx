import style from "./style.module.css";
import { IconArrowNarrowUp } from "@tabler/icons";

const ButtonRollingToTop = () => {
  
  function scrollingTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  return (
    <button type="button" onClick={scrollingTop} className={style.buttonTop}>
      <IconArrowNarrowUp />
    </button>
  );
};

export default ButtonRollingToTop;
