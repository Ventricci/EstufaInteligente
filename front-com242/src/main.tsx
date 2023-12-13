import React from "react";
import ReactDOM from "react-dom/client";
import Dashboard from "./presentation/screens/dashboard/Dashboard";
import SignIn from "./presentation/screens/signin/SignIn";
import SignUp from "./presentation/screens/signup/SignUp";
import "./index.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Profile from "./presentation/screens/Profile";

import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider>
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/register" element={<SignUp />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path="/profile" element={<Profile />}/>

    </Routes>
    </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
