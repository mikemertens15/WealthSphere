import { Route, Routes, Outlet } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { LocalizationProvider } from "@mui/x-date-pickers";

import { UserProvider } from "./Context/UserContext";
import { AccountLinkedContext } from "./Context/AccountLinkedContext";

import LoginPage from "./Pages/LoginPage";
import RegistrationPage from "./Pages/RegistrationPage";
import Dashboard from "./Pages/Dashboard";
import BudgetPage from "./Pages/BudgetPage";
import React from "react";
import TransactionsPage from "./Pages/TransactionsPage";
import BalancesPage from "./Pages/BalancesPage";
import InvestmentsPage from "./Pages/InvestmentsPage";
import DebtsPage from "./Pages/DebtsPage";
import BillsPage from "./Pages/BillsPage";
import GoalsPage from "./Pages/GoalsPage";
import AccountsPage from "./Pages/AccountsPage";

function App() {
  const navigate = useNavigate();
  const [accountLinked, setAccountLinked] = React.useState(false);

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProvider>
            <AccountLinkedContext.Provider
              value={{ accountLinked, setAccountLinked }}
            >
              <Routes>
                <Route path="/" element={<Outlet />}>
                  <Route index element={<LoginPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/budget" element={<BudgetPage />} />
                  <Route path="/transactions" element={<TransactionsPage />} />
                  <Route path="/balances" element={<BalancesPage />} />
                  <Route path="/investments" element={<InvestmentsPage />} />
                  <Route path="/debts" element={<DebtsPage />} />
                  <Route path="/bills" element={<BillsPage />} />
                  <Route path="/goals" element={<GoalsPage />} />
                  <Route path="/accounts" element={<AccountsPage />} />
                </Route>
              </Routes>
            </AccountLinkedContext.Provider>
          </UserProvider>
        </LocalizationProvider>
      </div>
    </>
  );
}

export default App;
