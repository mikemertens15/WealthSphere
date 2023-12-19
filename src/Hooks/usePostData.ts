import { useState } from "react";
import axios from "axios";

/**
 * Custom hook that handles sending POST requests to an API endpoint.
 * @param route The API route to send the POST request to.
 * @param userEmail The email of the user making the request.
 * @returns An object with the response, loading status, error, and a function to send the POST request.
 */
const usePostData = (route: string, userEmail: string | undefined) => {
  const [response, setResponse] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  /**
   * Sends a POST request to the specified API route.
   * @param data The data to be sent in the request body.
   */
  const postData = async (data: Record<string, unknown>) => {
    setLoading(true);
    try {
      const apiUrl = `${
        import.meta.env.VITE_API_URL
      }/${route}?email=${userEmail}`;
      const response = await axios.post(apiUrl, data);
      setResponse(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, postData };
};

export default usePostData;
