import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

type RequestProps<Req> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Req;
  headers?: Record<string, string>;
};

type UseAxiosReturn<Res> = {
  response: AxiosResponse<Res> | null;
  axiosError: AxiosError | null;
  loading: boolean;
  execute: () => Promise<void>;
};

export function useAxios<Req = unknown, Res = unknown>({
  url,
  method,
  body,
  headers,
}: RequestProps<Req>): UseAxiosReturn<Res> {
  const [response, setResponse] = useState<AxiosResponse<Res> | null>(null);
  const [axiosError, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const execute = useCallback(async () => {
    const fetchData = async () => {
      try {
        const axiosConfig: AxiosRequestConfig<Req> = {
          method,
          url: `${import.meta.env.VITE_API_URL}${url}`,
          headers: headers || { "Content-Type": "application/json" },
          data: body,
        };
        const result = await axios<Res>(axiosConfig);
        setResponse(result);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        } else if (err instanceof Error) {
          setError(new AxiosError(err.message));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, headers]);

  return { response, axiosError, loading, execute };
}
