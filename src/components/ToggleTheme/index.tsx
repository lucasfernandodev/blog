import style from "./style.module.css";

import { IconMoon, IconSun } from "@tabler/icons";
import { useEffect, useState } from "react";

const ToggleTheme = () => {
  const theme = localStorage.getItem("AETER_THEME") || "dark";
  const currentTheme: boolean = theme === "dark" ? true : false;

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(currentTheme);

  useEffect(() => {
    const theme = localStorage.getItem("AETER_THEME") || "dark";
    const currentTheme: boolean = theme === "dark" ? true : false;
    setIsDarkTheme(currentTheme);
  }, []);


  useEffect(() => {
    if (window) {
      isDarkTheme === true
        ? document.querySelector("html")?.classList.add("isDarkTheme")
        : document.querySelector("html")?.classList.remove("isDarkTheme");
    }
  }, [isDarkTheme]);


  function toggleTheme() {
    const themePrev = isDarkTheme;
    setIsDarkTheme(!isDarkTheme);

    const theme = !themePrev ? "dark" : "ligth";

    window.localStorage.setItem("AETER_THEME", theme);
  }

  return (
    <button className={style.toggleTheme} onClick={toggleTheme}>
      {isDarkTheme ? <IconMoon /> : <IconSun />}
    </button>
  );
};

export default ToggleTheme;
