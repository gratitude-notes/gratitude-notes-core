import React from "react";
import useComponentVisible, { ComponentVisbilityProps } from "../../hooks/useComponentVisible";

type SettingsModalContextValue = {
  visible: ComponentVisbilityProps;
  handleChange: () => void;
};

export const SettingsModalContext = React.createContext<SettingsModalContextValue | undefined>(
  undefined
);

export const useSettingsModal = () => {
  const context = React.useContext(SettingsModalContext);
  if (!context) {
    throw new Error("useSettingsModal must be used within a SettingsModalProvider");
  }
  return context;
};

type SettingsModalProviderProps = {
  children: React.ReactNode;
};

export const SettingsModalProvider: React.FC<SettingsModalProviderProps> = ({
  children,
}: SettingsModalProviderProps) => {
  const { ref, isComponentVisible, setComponentVisible } = useComponentVisible(false);

  const handleChange = () => {
    setComponentVisible(false);
  };

  const value = {
    visible: {
      ref,
      isComponentVisible,
      setComponentVisible,
    },
    handleChange,
  };

  return (
    <SettingsModalContext.Provider value={value}>{children}</SettingsModalContext.Provider>
  );
};
