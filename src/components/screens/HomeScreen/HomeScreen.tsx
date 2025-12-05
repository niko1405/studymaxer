import { useRef, useEffect } from 'react';
import useStudyMaxer from '../../hooks/useStudyMaxer';
import WelcomeSection from './WelcomeSection';
import ExplorerSection from './ExplorerSection';
import MatchesSection from './MatchesSection';
import { useLocation } from 'react-router-dom';

const HomeScreen = () => {
  const location = useLocation();
  const { currentHash } = useStudyMaxer();

  const welcomeRef = useRef<HTMLDivElement>(null);
  const matchesRef = useRef<HTMLElement>(null);
  const explorerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Entscheide: Instant (auto) wenn erster Render, sonst Smooth
    const behavior: ScrollBehavior = 'smooth';

    const timer = setTimeout(() => {
      if (currentHash === '#welcome') {
        welcomeRef.current?.scrollIntoView({ behavior });
      } else if (currentHash === '#matches') {
        matchesRef.current?.scrollIntoView({ behavior });
      } else if (currentHash === '#explorer') {
        explorerRef.current?.scrollIntoView({ behavior });
      }
    }, 10);

    return () => {
      clearTimeout(timer);
    }
  }, [currentHash, location.state]);

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth hide-scrollbar bg-slate-900 text-white">
        <div className="absolute top-0" />

        <WelcomeSection ref={welcomeRef} />

        <MatchesSection ref={matchesRef} />

        <ExplorerSection ref={explorerRef} />

      </div>
    </>
  );
}

export default HomeScreen;