import { useContext } from "react";
import { HomeScreenContext } from "../../context/HomeScreenProvider";

// Custom Hook für einfachen Zugriff
export const useHomeScreen = () => {
  const context = useContext(HomeScreenContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};

export default useHomeScreen;