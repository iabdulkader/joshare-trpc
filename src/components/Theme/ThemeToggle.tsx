import styles from "./ThemeToggle.module.scss"
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
    const { activeTheme, toggle } = useTheme();

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