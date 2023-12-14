import { Routes, Route, Navigate, useLocation } from 'react-router-dom'

import Dashboard from "./presentation/screens/dashboard/Dashboard";
import SignIn from "./presentation/screens/signin/SignIn";
import SignUp from "./presentation/screens/signup/SignUp";
import Profile from "./presentation/screens/Profile";
import { AppContext } from './context/AppContext';
import { useContext, useEffect } from 'react';

export function Router() {

  const { token, authenticated } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== "/signin" && location.pathname !== "/register" && (!token || token === '')) {
      window.alert("Você precisa estar logado para acessar essa página!");
    }
  }, [location, token]);

  return (
    <Routes>
      <Route path="/" element={authenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/signin" />} />
      <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/signin" />} />
    </Routes>
  )
}
