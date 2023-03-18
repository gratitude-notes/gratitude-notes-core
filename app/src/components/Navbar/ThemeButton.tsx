import { BsBrightnessHigh, BsMoon } from 'react-icons/bs'
import { useState, useEffect } from 'react';

const ThemeButton: React.FC = () => {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches){
        setTheme('dark');
        } else {
        setTheme('light');
        }
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        } else {
        document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div>
            <button onClick={handleThemeSwitch} className="inline-flex px-2 py-2 items-center ml-2 bg-white rounded-lg hover:bg-neutral-200">
                {theme === 'light'
                    ? <BsMoon size={20}/>
                    : <BsBrightnessHigh size={20}/>
                }
            </button>
        </div>
    );
}

export default ThemeButton;