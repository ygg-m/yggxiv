import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {
  Leaderboard,
  MainInfo,
  Members,
  Stats,
} from "./Components/FreeCompany";
import { FreeCompanyProvider } from "./Contexts/FreeCompanyContext";
import { GameDataProvider } from "./Contexts/GameDataContext";
import { SearchProvider } from "./Contexts/SearchContext";
import { StatsProvider } from "./Contexts/StatsContext";
import { ErrorPage, FreeCompany, Home } from "./Pages";
import {
  Achievement,
  Minion,
  Mount,
} from "./Pages/FreeCompany/Pages/Leaderboard/index";
import { AchievementStats } from "./Pages/FreeCompany/Pages/Stats/Full/AchievementStats";
import { CollectibleStats } from "./Pages/FreeCompany/Pages/Stats/Full/CollectibleStats";
import {
  Character,
  Job,
  MinionStats,
  MountStats,
} from "./Pages/FreeCompany/Pages/Stats/Full/index";
import { Summary } from "./Pages/FreeCompany/Pages/Stats/Summary/Summary";
import reportWebVitals from "./reportWebVitals";
import "./Styles/index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/FreeCompany/:fcId/*",
    element: (
      <FreeCompanyProvider>
        <FreeCompany />
      </FreeCompanyProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "Info", element: <MainInfo /> },
      { path: "Members", element: <Members /> },
      {
        path: "Leaderboard",
        element: <Leaderboard />,
        children: [
          { path: "Mount", element: <Mount /> },
          { path: "Minion", element: <Minion /> },
          { path: "Achievement", element: <Achievement /> },
        ],
      },
      {
        path: "Stats/*",
        element: (
          <StatsProvider>
            <Stats />
          </StatsProvider>
        ),
        children: [
          { path: "Summary", element: <Summary /> },
          { path: "Character", element: <Character /> },
          { path: "Job", element: <Job /> },
          {
            path: "Mount",
            element: <MountStats />,
            children: [
              { path: "Popular", element: <MountStats /> },
              { path: "Rarest", element: <MountStats /> },
            ],
          },
          {
            path: "Minion",
            element: <MinionStats />,
            children: [
              { path: "Popular", element: <MinionStats /> },
              { path: "Rarest", element: <MinionStats /> },
            ],
          },
          {
            path: "Achievement",
            element: <AchievementStats />,
            children: [
              { path: "Battle", element: <AchievementStats /> },
              { path: "PvP", element: <AchievementStats /> },
              { path: "Character", element: <AchievementStats /> },
              { path: "Craft&Gather", element: <AchievementStats /> },
              { path: "Quests", element: <AchievementStats /> },
              { path: "Exploration", element: <AchievementStats /> },
              { path: "Grand Company", element: <AchievementStats /> },
              { path: "Legacy", element: <AchievementStats /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/Character/:charId",
    element: <Character />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GameDataProvider>
      <SearchProvider>
        <RouterProvider router={router} fallbackElement={<ErrorPage />} />
      </SearchProvider>
    </GameDataProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
