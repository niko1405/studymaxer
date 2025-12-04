import { Outlet } from 'react-router-dom';
import { StudyMaxerProvider } from './context/StudyMaxerProvider';
import HomeScreenProvider from './context/HomeScreenProvider';

export default function App() {
  return (
    <StudyMaxerProvider>
      <HomeScreenProvider>
        <Outlet />
      </HomeScreenProvider>
    </StudyMaxerProvider>
  );
}
