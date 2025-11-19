import { Outlet } from 'react-router-dom';
import { StudyMaxerProvider } from './context/StudyMaxerProvider';

export default function App() {
  return (
    <StudyMaxerProvider>
      <Outlet />
    </StudyMaxerProvider>
  );
}
