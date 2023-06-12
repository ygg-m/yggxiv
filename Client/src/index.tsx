import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import {
  Leaderboard,
  MainInfo,
  Members,
  Stats,
} from "./Components/FreeCompany";

import { StatsProvider } from "./Contexts/StatsContext";
import { Character, ErrorPage, FreeCompany, Home } from "./Pages";
import {
  CharAchievements,
  CharAchievementsARR,
  CharAchievementsEW,
  CharAchievementsExpansion,
  CharAchievementsFullList,
  CharAchievementsHW,
  CharAchievementsSB,
  CharAchievementsSHB,
  CharCollection,
  CharCollectionARR,
  CharCollectionContent,
  CharCollectionEW,
  CharCollectionExpansion,
  CharCollectionExpansionMinions,
  CharCollectionExpansionMounts,
  CharCollectionFullList,
  CharCollectionFullListMinions,
  CharCollectionFullListMounts,
  CharCollectionHW,
  CharCollectionSB,
  CharCollectionSHB,
  CharGear,
  CharInfo,
  CharJobs,
  CharStats,
} from "./Pages/Character";
import {
  Achievement,
  Minion,
  Mount,
} from "./Pages/FreeCompany/Pages/Leaderboard/index";
import { AchievementStats } from "./Pages/FreeCompany/Pages/Stats/Full/AchievementStats";
import {
  CharacterStats,
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
    children: [
      {
        path: "FreeCompany/:fcId/*",
        element: <FreeCompany />,
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
              { path: "Character", element: <CharacterStats /> },
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
                  { path: "Popular", element: <AchievementStats /> },
                  { path: "Rarest", element: <AchievementStats /> },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "Character/:charId",
        element: <Character />,
        children: [
          { path: "Info", element: <CharInfo /> },
          {
            path: "Collection",
            element: <CharCollection />,
            children: [
              {
                path: "FullList",
                element: <CharCollectionFullList />,
                children: [
                  { path: "Mounts", element: <CharCollectionFullListMounts /> },
                  {
                    path: "Minions",
                    element: <CharCollectionFullListMinions />,
                  },
                ],
              },
              {
                path: "Expansion",
                element: <CharCollectionExpansion />,
                children: [
                  {
                    path: "Mounts",
                    element: <CharCollectionExpansionMounts />,
                    children: [
                      {
                        path: "ARealmReborn",
                        element: <CharCollectionARR />,
                      },
                      { path: "Heavensward", element: <CharCollectionHW /> },
                      { path: "Stormblood", element: <CharCollectionSB /> },
                      {
                        path: "Shadowbringers",
                        element: <CharCollectionSHB />,
                      },
                      { path: "Endwalker", element: <CharCollectionEW /> },
                    ],
                  },
                  {
                    path: "Minions",
                    element: <CharCollectionExpansionMinions />,
                    children: [
                      {
                        path: "ARealmReborn",
                        element: <CharCollectionARR />,
                      },
                      { path: "Heavensward", element: <CharCollectionHW /> },
                      { path: "Stormblood", element: <CharCollectionSB /> },
                      {
                        path: "Shadowbringers",
                        element: <CharCollectionSHB />,
                      },
                      { path: "Endwalker", element: <CharCollectionEW /> },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "Achievements",
            element: <CharAchievements />,
            children: [
              { path: "FullList", element: <CharAchievementsFullList /> },
              {
                path: "Expansion",
                element: <CharAchievementsExpansion />,
                children: [
                  { path: "ARealmReborn", element: <CharAchievementsARR /> },
                  { path: "Heavensward", element: <CharAchievementsHW /> },
                  { path: "Stormblood", element: <CharAchievementsSB /> },
                  { path: "Shadowbringers", element: <CharAchievementsSHB /> },
                  { path: "Endwalker", element: <CharAchievementsEW /> },
                ],
              },
            ],
          },
          { path: "Stats", element: <CharStats /> },
          { path: "Jobs", element: <CharJobs /> },
          { path: "Gear", element: <CharGear /> },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<ErrorPage />} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
