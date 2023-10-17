import { useState, useCallback } from "react";
import { User } from "../Context/UserContext";

export const useFetchTransactions = (user: User | null) => {
  const [transactions, setTransactions] = useState(null);

  // need to protect against the user being null
  const fetchTransactions = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3001/api/transactions?email=${user!.email}&itemId=${
        user!.items[0]
      }`
    );
    const data = await response.json();
    setTransactions(data);
  }, [user]);

  return { transactions, fetchTransactions };
};
