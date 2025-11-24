import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import useStudyMaxer from './hooks/useStudyMaxer';
import { OnboardingQuestions } from './screens/OnboardingQuestions';
import GetStarted from './screens/GetStarted';
import LoadingScreen from './screens/LoadingScreen';

export function MainApp() {
  const { appState, setAppState } = useStudyMaxer();

  if (appState === 'get-started')
    return <GetStarted />

  if(appState === 'onboarding')
    return <OnboardingQuestions />

  if(appState === 'evaluating')
    return <LoadingScreen onComplete={() => setAppState('main')} />;

  return (
    <div className="bg-[#0a1628] h-dvh w-full flex flex-col text-white font-sans selection:bg-blue-500/30 select-none">
      
      {/* Content Area */}
      <main className="flex-1 flex flex-col relative z-10">
        <Outlet />
      </main>

      <Navigation />
    </div>
  );
}