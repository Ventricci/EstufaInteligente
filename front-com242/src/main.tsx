import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

import { AppProvider } from "./context/AppContext";
import { Router } from "./Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <AppProvider>
    <Router />
  </AppProvider>
  </BrowserRouter>
);
