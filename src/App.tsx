import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginForm from "./Components/LoginForm";
import RegistrationForm from "./Components/RegistrationForm";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
