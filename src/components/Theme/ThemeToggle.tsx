"use client";

import styles from "./ThemeToggle.module.scss"
import { useState, useEffect } from "react";

type activeTheme = string | null;

export default function ThemeToggle() {
    const [activeTheme, setActiveTheme] = useState<activeTheme>("");

    const toggle = () => {
        setActiveTheme(activeTheme === "dark" ? "light" : "dark")
    }

  
      useEffect(() => {

        if(window.localStorage.getItem("theme")) {
          setActiveTheme(window.localStorage.getItem("theme"))
        }

        if(activeTheme === "light") {
            document.documentElement.classList.remove('dark')
            localStorage.theme = "light";
            setActiveTheme("light")
        } 
        
        if(activeTheme === "dark") {
            setActiveTheme("dark")
            localStorage.theme = "dark";
            document.documentElement.classList.add('dark')
        }

      }, [activeTheme]);

    return(
        <input 
          id="toggle"  
          onChange={toggle} 
          className={styles.toggle} 
          type="checkbox" 
          checked={activeTheme === "dark" ? true : false}  
        />
    )
}