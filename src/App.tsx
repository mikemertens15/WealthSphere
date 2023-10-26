import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Route, Routes, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

import { UserProvider } from "./Context/UserContext";

import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import Dashboard from "./Pages/Dashboard";
import DashboardV2 from "./Pages/Dashboard";
import React from "react";

function App() {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <div>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Dashboard />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/dashboard" element={<DashboardV2 />} />
            </Route>
          </Routes>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
