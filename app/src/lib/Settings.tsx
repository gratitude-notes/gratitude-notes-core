import { createContext, useContext, useEffect, useState } from 'react';
import useProfileData, { UserSettings } from '../hooks/useProfileData';
import React from 'react';

type Settings = UserSettings;

const SettingsContext = createContext<Settings | undefined>(undefined);

export const useSettings = () => {
    const ctx = useContext(SettingsContext);

    if (ctx != undefined) {
        return ctx;
    }
};

export const SettingsWrapper = ({ children }: { children: JSX.Element[] }) => {
    const [settings, setSettings] = useState<Settings | undefined>();

    const currentUserProfileData = useProfileData();
    useEffect(() => setSettings(currentUserProfileData?.settings), [currentUserProfileData]);

    return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
};
