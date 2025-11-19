import { createContext, useState, type ReactNode } from "react";
import type { ActiveTab, AppState, SetState } from "../types/types";
import { useLocation } from "react-router-dom";

interface StudyMaxerContextType {
    appState: AppState;
    setAppState: SetState<AppState>;
    activeTab: ActiveTab;
}

export const StudyMaxerContext = createContext<StudyMaxerContextType | null>(null);

interface StudyMaxerProviderProps {
    children: ReactNode
}

export const StudyMaxerProvider = ({ children }: StudyMaxerProviderProps) => {
    const [appState, setAppState] = useState<AppState>('get-started');

    const location = useLocation();
    const currentPath = location.pathname.substring(1);

    const activeTab: ActiveTab = currentPath === 'home' || currentPath === 'premium' || currentPath === 'profile'
        ? currentPath as ActiveTab
        : 'home';

    // DATA OBJECT FOR CONTEXT
    const contextValue: StudyMaxerContextType = {
        appState,
        setAppState,
        activeTab
    };

    return (
        <StudyMaxerContext.Provider value={contextValue} >
            {children}
        </StudyMaxerContext.Provider>
    );
}