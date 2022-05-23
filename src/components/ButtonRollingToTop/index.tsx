import style from "./style.module.css";
import { IconArrowNarrowUp } from "@tabler/icons";
import { useEffect, useRef } from "react";

interface ButtonRollingToTopProps{
  bottomFixed?: number
}

const ButtonRollingToTop = ({bottomFixed}: ButtonRollingToTopProps) => {
  
  const buttonRef = useRef<HTMLButtonElement>(null);

  function scrollingTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    if(buttonRef.current){
      buttonRef.current.style.setProperty('--bottom', `${bottomFixed}px`)
    }
  }, [bottomFixed])

  return (
    <button type="button" ref={buttonRef} onClick={scrollingTop} className={style.buttonTop}>
      <IconArrowNarrowUp />
    </button>
  );
};

export default ButtonRollingToTop;
