import { useState, useCallback } from "react";
import axios from "axios";

// This hook fetches the user's current dashboard data from the server
const useDashboardData = () => {
  const [netWorth, setNetWorth] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchDashboardData = useCallback(async (userEmail: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get_dashboard_data?email=${userEmail}`
      );
      setNetWorth(response.data.netWorth);
      setRecentTransactions(response.data.recentTransactions);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    }
  }, []);

  return {
    netWorth,
    recentTransactions,
    error,
    fetchDashboardData,
  };
};

export default useDashboardData;
