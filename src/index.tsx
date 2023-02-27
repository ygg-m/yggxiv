import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage, FreeCompany, Home, Player } from "./Pages";
import reportWebVitals from "./reportWebVitals";
import "./Styles/index.css";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/FreeCompany/:fcId",
      element: <FreeCompany />,
    },
    {
      path: "/Player/:playerId",
      element: <Player />,
    },
  ],
  {
    basename: "/yggxiv",
  }
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
