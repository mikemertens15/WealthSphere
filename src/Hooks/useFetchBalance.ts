import { useState, useCallback } from "react";
import { User } from "../Context/UserContext";

export const useFetchBalance = (user: User | null) => {
  const [balance, setBalance] = useState(null);

  const fetchBalance = useCallback(async () => {
    const response = await fetch(
      `http://localhost:3001/api/balance?email=${user!.email}&itemId=${
        user!.items[0]
      }`
    );
    const data = await response.json();
    setBalance(data);
  }, [user]);

  return { balance, fetchBalance };
};
