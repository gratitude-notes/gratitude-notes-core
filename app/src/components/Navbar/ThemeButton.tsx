import { BsBrightnessHigh, BsMoon } from 'react-icons/bs'
import useTheme from '../../hooks/useTheme';

const ThemeButton: React.FC = () => {
    const { theme, setTheme, setThemeHandler, themeHandler } = useTheme();

    const handleThemeButton = () => {
        setThemeHandler("user");
        const updateTheme = (theme === "dark") ? "light" : "dark"
        setTheme(updateTheme);
    }

    return (
        <div>
            <button onClick={handleThemeButton} className="px-3 py-2">
                {theme === 'light'
                    ? <BsMoon color={'#06b6d4'} size={20}/>
                    : <BsBrightnessHigh color={'#06b6d4'} size={20}/>
                }
            </button>
        </div>
    );
}

export default ThemeButton;