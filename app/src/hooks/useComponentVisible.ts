import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from "react";

export interface ComponentVisbilityProps {
    ref: RefObject<HTMLDivElement>,
    isComponentVisible: boolean,
    setComponentVisible: Dispatch<SetStateAction<boolean>>
}

const useComponentVisible = (initialVisible: boolean): ComponentVisbilityProps => {
    const [isComponentVisible, setComponentVisible] = useState(initialVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if(ref.current && !ref.current.contains(target)) {
            setComponentVisible(false);
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside, true);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside, true);
        }
    }, []);

    return { ref, isComponentVisible, setComponentVisible };
}

export default useComponentVisible;