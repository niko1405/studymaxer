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
    <div className="bg-[#0a1628] h-dvh w-full flex flex-col overflow-hidden text-white font-sans selection:bg-blue-500/30">
      
      {/* Content Area */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden relative z-10">
        <Outlet />
      </main>

      <Navigation />

      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-1/3 bg-linear-to-b from-blue-900/10 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-[#0a1628] to-transparent pointer-events-none -z-10" />
    </div>
  );
}