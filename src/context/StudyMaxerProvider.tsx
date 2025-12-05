import { createContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import type { ActiveTab, AppState, SetState } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";

interface StudyMaxerContextType {
    appState: AppState;
    setAppState: SetState<AppState>;
    activeTab: ActiveTab;
    showNavigation: Boolean;
    setShowNavigation: SetState<Boolean>;
    showNotification: Boolean;
    setShowNotification: SetState<Boolean>;
    currentHash: string;
    prevHash: string;
    currentPath: string;
    blockObserver: Boolean;
    setBlockObserver: SetState<Boolean>;
}

export const StudyMaxerContext = createContext<StudyMaxerContextType | null>(null);

interface StudyMaxerProviderProps {
    children: ReactNode
}

export const StudyMaxerProvider = ({ children }: StudyMaxerProviderProps) => {
    const [appState, setAppState] = useState<AppState>('get-started');
    const [showNavigation, setShowNavigation] = useState<Boolean>(true);
    const [showNotification, setShowNotification] = useState<Boolean>(true);
    const [blockObserver, setBlockObserver] = useState<Boolean>(false);

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname.substring(1);

    const activeTab: ActiveTab = currentPath === 'home' || currentPath === 'premium' || currentPath === 'profile'
        ? currentPath as ActiveTab
        : 'home';

    const [currentHash, setCurrentHash] = useState<string>(location.hash);
    const [prevHash, setPrevHash] = useState<string>(currentHash);

    useLayoutEffect(() => {
        if (currentHash !== '#matches' && currentHash !== '#explorer') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'instant'
            });
        }
    }, [activeTab]);

    useEffect(() => {
        setCurrentHash(prev => {
            setPrevHash(prev);
            return location.hash
        });
    }, [location.hash]);

    useEffect(() => {
        switch (appState) {
            case 'main':
                navigate('/home#welcome');
                break;
            case 'get-started':
                navigate('/');
                break;
            case 'onboarding':
                navigate('/');
                break;
            default:
                break;
        }
    }, [appState]);

    // DATA OBJECT FOR CONTEXT
    const contextValue: StudyMaxerContextType = {
        appState,
        setAppState,
        activeTab,
        showNavigation,
        setShowNavigation,
        showNotification,
        setShowNotification,
        currentHash,
        currentPath,
        blockObserver,
        setBlockObserver,
        prevHash,
    };

    return (
        <StudyMaxerContext.Provider value={contextValue} >
            {children}
        </StudyMaxerContext.Provider>
    );
}