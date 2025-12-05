
import { createRoot } from "react-dom/client";
import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from "./App.tsx";
import "./index.css";


import { MainApp } from "./components/MainApp.tsx";
import HomeScreen from "./components/screens/HomeScreen/HomeScreen.tsx";
import { PremiumScreen } from "./components/screens/PremiumScreen.tsx";
import { ProfileScreen } from "./components/screens/ProfileScreen.tsx";
import MatchesDetailView from "./components/screens/MatchesDetailView.tsx";
import InstitutionDetailView from "./components/screens/InstitutionDetailView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainApp />,
        children: [
          { index: true, element: <HomeScreen /> },
          {
            path: "home",
            element: <HomeScreen />
          },
          {
            path: "premium",
            element: <PremiumScreen />
          },
          {
            path: "profile",
            element: <ProfileScreen />
          },
          {
            path: "matches/:id",
            element: <MatchesDetailView />
          },
          {
            path: "institutions/:id",
            element: <InstitutionDetailView />
          },
        ]
      },
    ]
  },
]);

const root: any = document.getElementById("root");

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);