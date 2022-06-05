import { useEffect, useState } from 'react';


export const useScrollbarTop = () => {
  const [isButtonTotopShow, setIsButtonTotopShow] = useState(false);
  const [buttonBottomFixed, setButtonBottomFixed] = useState<number>(20);

  useEffect(() => {
    const body = document.querySelector('body');
    let timer: any = null;

    function debounce() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const doc = document.documentElement;

        doc.scrollTop > 200
          ? setIsButtonTotopShow(true)
          : setIsButtonTotopShow(false);

        const scrollbarPosition =
          (100 * doc.scrollTop) / (doc.scrollHeight - doc.clientHeight);

        if (scrollbarPosition >= 97) {
          setButtonBottomFixed(80);
        }

        if (scrollbarPosition < 97) {
          setButtonBottomFixed(20);
        }
      }, 300);
    }

    const scrolling = () => {
      debounce();
    };

    // Add Event
    if (body) {
      document.documentElement.addEventListener('wheel', scrolling);
    }

    // Removing Event
    return () => {
      clearTimeout(timer);
      document.documentElement &&
        document.documentElement.removeEventListener('wheel', scrolling);
    };
  }, []);

  return {
    isButtonTotopShow,
    buttonBottomFixed
  };
};