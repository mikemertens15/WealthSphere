import { useState, useCallback } from "react";

export const useFetchTransactions = (user) => {
  const [transactions, setTransactions] = useState(null);

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
