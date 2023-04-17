import { createContext, useContext, useEffect, useState } from "react";

type Global = {
    searchQuery: string
}

const GlobalContext = createContext<Global | undefined>(undefined);

export const useGlobal = () => {
    const ctx = useContext(GlobalContext);

    if (ctx != undefined) {
        return ctx;
    }
}

export const GlobalWrapper = ({ children }: { children: JSX.Element[] }) => {
    const [global, setGlobal] = useState<Global | undefined>();

    useEffect(() => setGlobal({ searchQuery: "" }), []);

    return (
        <GlobalContext.Provider value={global}>
            {children}
        </GlobalContext.Provider>
    )
}