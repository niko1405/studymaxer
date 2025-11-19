import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

export function MainApp() {
  return (
    <div className="h-screen bg-[#0a1628] flex flex-col overflow-hidden">
      <div className="flex-grow overflow-y-auto pb-20">
        <Outlet />
      </div>

      <Navigation />
    </div>
  );
}