import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import useStudyMaxer from './hooks/useStudyMaxer';
import { GetStarted } from './screens/GetStarted';
import { OnboardingQuestions } from './screens/OnboardingQuestions';

export function MainApp() {
  const { appState } = useStudyMaxer();

  if (appState === 'get-started')
    return <GetStarted />

  if(appState === 'onboarding')
    return <OnboardingQuestions />

  return (
    <div className="h-screen bg-[#0a1628] flex flex-col overflow-hidden">
      <div className="grow overflow-y-auto pb-20">
        <Outlet />
      </div>

      <Navigation />
    </div>
  );
}