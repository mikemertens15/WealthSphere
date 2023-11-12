import { useState, useEffect } from "react";
import axios from "axios";

// This hook fetches the user's current dashboard data from the server
const useDashboardData = (userEmail: string | undefined) => {
  const [netWorth, setNetWorth] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [userHasBudget, setUserHasBudget] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/get_dashboard_data?email=${userEmail}`
      );
      setNetWorth(response.data.netWorth);
      setRecentTransactions(response.data.recentTransactions);
      setIncome(response.data.income);
      setUserHasBudget(response.data.userHasBudget);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    }
    setLoading(false);
  };

  // Fetches the user's dashboard data when a new account is linked
  useEffect(() => {
    fetchData();
  }, [userEmail]);

  if (!userEmail) {
    return {
      netWorth: null,
      income: null,
      recentTransactions: null,
      userHasBudget: null,
    };
  }

  return {
    netWorth,
    recentTransactions,
    income,
    userHasBudget,
    loading,
    error,
    fetchData,
  };
};

export default useDashboardData;
