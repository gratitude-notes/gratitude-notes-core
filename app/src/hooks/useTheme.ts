import { useEffect, useState } from "react";

 const useTheme = () => {
    const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

    const getOnLoadSystemTheme = (window.matchMedia(COLOR_SCHEME_QUERY)) ? "dark" : "light";

    const [theme, setTheme] = useState(getOnLoadSystemTheme);
    const [themeHandler, setThemeHandler] = useState("system");
    
    const updateTheme = (e?: MediaQueryListEvent) => {
        if (themeHandler === "system" && e) {
            const isDark = e.matches;
            const updateTheme = (isDark) ? "dark" : "light"
            setTheme(updateTheme);
        }
    }

    const registerSystemThemeListener = () => {
        const mediaListener = window.matchMedia(COLOR_SCHEME_QUERY);
        mediaListener.addEventListener("change", updateTheme, true)

        return () => {
            mediaListener.removeEventListener("change", updateTheme, true)
        }
    }

    const changeThemeCSS = () => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    useEffect(registerSystemThemeListener, []);
    useEffect(changeThemeCSS, [theme]);

    return { theme, setTheme, themeHandler, setThemeHandler }
 }
 
export default useTheme;