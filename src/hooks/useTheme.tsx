import { useEffect, useState } from "react";

export default function useTheme(){
    const [activeTheme, setActiveTheme] = useState<string | null>(null);

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

        let link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
        link.href = `/${activeTheme}.svg`;

    }, [activeTheme]);

    return { activeTheme, toggle }
}