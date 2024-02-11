import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ModeProvider } from "./ModeProvider/ModeProvider";
import { LeaderBoardProvider } from "./components/LeaderBoardProvider/LeaderBoardProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LeaderBoardProvider>
      <ModeProvider>
        <RouterProvider router={router}></RouterProvider>
      </ModeProvider>
    </LeaderBoardProvider>
  </React.StrictMode>,
);
