import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import { useNavigate } from "react-router";

import { UserProvider } from "./Context/UserContext";

import LoginForm from "./Components/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
import Dashboard from "./Components/Dashboard";
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
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </UserProvider>
      </div>
    </>
  );
}

export default App;
