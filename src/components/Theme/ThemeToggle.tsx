import styles from "./ThemeToggle.module.scss"
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);

    if(localStorage.getItem("theme") === null){
      setTheme("light");
    };
  }, []);

  useEffect(() => {
    let link = document.createElement('link');
    link.rel = 'icon';

    document.getElementsByTagName('head')[0].appendChild(link);
    if(theme === "dark"){
        link.href = "/favicon-dark.ico"
    } else {
        link.href = "/favicon.ico"
    }
    
  }, [theme])

  if (!mounted) {
    return <div className="w-6 h-6"></div>;
  }

  const toggle = () => {
    if (theme === "light") {
      return setTheme("dark");
    }
    return setTheme("light");
  }

  return (
    <input 
      id="toggle"  
      onChange={toggle} 
      className={styles.toggle} 
      type="checkbox" 
      checked={theme === "dark" ? true : false}  
    />
  );
}
