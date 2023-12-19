import { useState, useEffect } from "react";
import axios from "axios";

const useGetData = (route: string, userEmail: string | undefined) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/${route}?email=${userEmail}`
        );
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userEmail, route]);

  return { data, loading, error };
};

export default useGetData;
