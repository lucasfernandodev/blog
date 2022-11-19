import style from './style.module.css';
import { IconArrowNarrowUp } from '@tabler/icons';
import { useEffect, useRef } from 'react';
import { useScrollbarTop } from '../../../Hooks/useScrollbarTop';

const ButtonRollingToTop = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonBottomFixed, isButtonTotopShow } = useScrollbarTop();

  function handleScrollingTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.style.setProperty('--bottom', `${buttonBottomFixed}px`);
    }
  }, [buttonBottomFixed]);

  if (isButtonTotopShow)
    return (
      <button
        type='button'
        ref={buttonRef}
        onClick={handleScrollingTop}
        className={style.buttonTop}
      >
        <IconArrowNarrowUp />
      </button>
    );

  return <div />;
};

export default ButtonRollingToTop;
