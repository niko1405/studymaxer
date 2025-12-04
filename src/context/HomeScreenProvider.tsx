import { createContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

type HomeSection = 'welcome' | 'matches' | 'explorer';

interface HomeScreenContextType {
    matchesRef: React.RefObject<HTMLElement | null>;
    explorerRef: React.RefObject<HTMLElement | null>;
    scrollTo: (section: HomeSection, behavior?: ScrollBehavior) => void;
}

export const HomeScreenContext = createContext<HomeScreenContextType | null>(null);

// Der Provider, der die Refs und Funktionen hält
const HomeScreenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const matchesRef = useRef<HTMLElement | null>(null);
    const explorerRef = useRef<HTMLElement | null>(null);

    const navigate = useNavigate();

    const scrollTo = (section: HomeSection, behavior: ScrollBehavior = 'smooth') => {
        if (section === 'matches') {
            matchesRef.current?.scrollIntoView({ behavior });
            // navigate('/home#matches');
        } else if (section === 'explorer') {
            explorerRef.current?.scrollIntoView({ behavior });
            // navigate('/home#explorer');
        } 
    }

    const contextValue: HomeScreenContextType = {
        matchesRef,
        explorerRef,
        scrollTo,
    };

    return (
        <HomeScreenContext.Provider value={contextValue} >
            {children}
        </HomeScreenContext.Provider>
    );
};

export default HomeScreenProvider;