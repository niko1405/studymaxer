import { createContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import type { ActiveTab, AppState, SetState } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";

interface StudyMaxerContextType {
    appState: AppState;
    setAppState: SetState<AppState>;
    activeTab: ActiveTab;
    showNavigation: Boolean;
    setShowNavigation: SetState<Boolean>;
}

export const StudyMaxerContext = createContext<StudyMaxerContextType | null>(null);

interface StudyMaxerProviderProps {
    children: ReactNode
}

export const StudyMaxerProvider = ({ children }: StudyMaxerProviderProps) => {
    const [appState, setAppState] = useState<AppState>('get-started');
    const [showNavigation, setShowNavigation] = useState<Boolean>(true);

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname.substring(1);

    const activeTab: ActiveTab = currentPath === 'home' || currentPath === 'premium' || currentPath === 'profile'
        ? currentPath as ActiveTab
        : 'home';

    useLayoutEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, [activeTab]);

    useEffect(() => {
        if(appState == 'main') navigate('/home');
    }, [appState]);

    // DATA OBJECT FOR CONTEXT
    const contextValue: StudyMaxerContextType = {
        appState,
        setAppState,
        activeTab,
        showNavigation,
        setShowNavigation
    };

    return (
        <StudyMaxerContext.Provider value={contextValue} >
            {children}
        </StudyMaxerContext.Provider>
    );
}