import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Transactions from "./Transactions";

import { useCreateLinkToken } from "../Hooks/useCreateLinkToken";
import { useFetchTransactions } from "../Hooks/useFetchTransactions";
import { usePlaidConfig } from "../Hooks/usePlaidConfig";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a UserProvider");
  }

  const { user, addItemToUser } = context;
  const [accountLinked, setAccountLinked] = useState<boolean>(false); // needs to come from the user context
  const { linkToken, createLinkToken } = useCreateLinkToken();
  const { transactions, fetchTransactions } = useFetchTransactions(user);
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
      <h1>Welcome Back, {user ? user.name : "user is not defined"}</h1>
      <button onClick={() => navigate("/login")}>Log Out</button>
      <button onClick={() => open()} disabled={!ready}>
        Link Account
      </button>
      {accountLinked && (
        <>
          <button onClick={fetchTransactions}>Get Transactions</button>
          {transactions && <Transactions />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
