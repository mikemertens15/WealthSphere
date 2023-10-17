import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Transactions from "./Transactions";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";

const Dashboard: React.FC = () => {
  const [accountLinked, setAccountLinked] = useState<boolean>(false); // needs to come from the user context
  const [transactions, setTransactions] = useState(null);
  const [linkToken, setLinkToken] = useState(null);
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a UserProvider");
  }
  const { user, addItemToUser } = context;

  useEffect(() => {
    if (user && user.items && user.items.length >= 1) {
      setAccountLinked(true);
    }
  }, [user]);

  const createLinkToken = useCallback(async () => {
    const response = await fetch("http://localhost:3001/api/create_link_token");
    const data = await response.json();
    setLinkToken(data.link_token);
  }, [setLinkToken]);

  const fetchTransactions = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3001/api/transactions?email=${user!.email}&itemId=${
        user!.items[0]
      }`
    );
    const data = await response.json();
    setTransactions(data);
  }, [user]);

  const config: PlaidLinkOptions = {
    onSuccess: useCallback<PlaidLinkOnSuccess>(
      async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
        console.log(metadata);
        const response = await fetch(
          "http://localhost:3001/api/exchange_public_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_token: public_token,
              userEmail: user!.email,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          addItemToUser(data.itemId);
          setAccountLinked(true);
        }
      },
      [addItemToUser, user]
    ),
    onExit: (err, metadata) => {
      if (err) {
        console.log(err);
      } else {
        console.log(metadata);
      }
    },
    onEvent: (eventName, metadata) => {
      console.log(eventName, metadata);
    },
    token: linkToken,
  };

  const { open, ready } = usePlaidLink(config);

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
      <br />
      <br />
      <button onClick={() => open()} disabled={!ready}>
        Link Account
      </button>
      <br />
      <br />
      {accountLinked && (
        <>
          <button onClick={fetchTransactions}>Get Transactions</button>
          <br />
          {transactions && <Transactions />}
        </>
      )}
    </div>
  );
};

export default Dashboard;
