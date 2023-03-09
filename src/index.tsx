import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { CharacterProvider } from "./Contexts/CharacterContext";
import { FreeCompanyProvider } from "./Contexts/FreeCompanyContext";
import { SearchProvider } from "./Contexts/SearchContext";
import { Character, ErrorPage, FreeCompany, Home } from "./Pages";
import reportWebVitals from "./reportWebVitals";
import "./Styles/index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/FreeCompany/:fcId",
    element: (
      <FreeCompanyProvider>
        <FreeCompany />
      </FreeCompanyProvider>
    ),
    children: [{ path: "Members", element: <FreeCompany /> }],
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
    <SearchProvider>
      <RouterProvider router={router} />
    </SearchProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
