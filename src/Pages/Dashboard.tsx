import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Transactions from "../Components/Transactions";

import { useCreateLinkToken } from "../Hooks/useCreateLinkToken";
import { useFetchTransactions } from "../Hooks/useFetchTransactions";
import { usePlaidConfig } from "../Hooks/usePlaidConfig";
import Navbar from "../Components/Navbar";
import { useFetchBalance } from "../Hooks/useFetchBalance";
import Balance from "../Components/Balance";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a UserProvider");
  }

  const { user, addItemToUser, setUser } = context;
  setUser({
    name: "Mik",
    email: "admin@admin.com",
    items: ["KjLDoXM39PsqVxzRnj7bu9mJbmb7bkURMeDlk"],
  });

  const [accountLinked, setAccountLinked] = useState<boolean>(false); // needs to come from the user context
  const { linkToken, createLinkToken } = useCreateLinkToken();
  const { transactions, fetchTransactions } = useFetchTransactions(user);
  const { balance, fetchBalance } = useFetchBalance(user);
  const { open, ready } = usePlaidConfig(user, addItemToUser, linkToken);

  useEffect(() => {
    if (user && user.items && user.items.length >= 1) {
      setAccountLinked(true);
    }
  }, [user]);

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
    // if (isOauth && ready) {
    //   open();
    // }
  }, [createLinkToken, linkToken]);

  return (
    <div>
      <Navbar />
      <h1>Welcome Back, {user ? user.name : "user is not defined"}</h1>
      <Button variant="contained" onClick={() => navigate("/login")}>
        Log Out
      </Button>
      <button onClick={() => open()} disabled={!ready}>
        Link Account
      </button>
      {accountLinked && (
        <>
          <button onClick={fetchTransactions}>Get Transactions</button>
          <button onClick={fetchBalance}>Get Balance</button>
          <div className="widgets">
            {balance && <Balance balanceData={balance} />}
            {transactions && <Transactions />}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
