import { useState, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type RequestProps<Req, Params> = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: Req;
  params?: Params;
  headers?: Record<string, string>;
};

type UseAxiosReturn<Res> = {
  response: AxiosResponse<Res> | null;
  axiosErrorMessage: string | null;
  loading: boolean;
  execute: () => Promise<void>;
};

export function useAxios<Req = unknown, Res = unknown, Params = unknown>({
  url,
  method,
  body,
  params,
  headers,
}: RequestProps<Req, Params>): UseAxiosReturn<Res> {
  const [response, setResponse] = useState<AxiosResponse<Res> | null>(null);
  const [axiosErrorMessage, setAxiosErrorMessage] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const execute = useCallback(async () => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const axiosConfig: AxiosRequestConfig<Req> = {
          method,
          url: `${import.meta.env.VITE_API_URL}${url}`,
          headers: headers || { "Content-Type": "application/json" },
          ...(method === "GET" ? { params } : { data: body }),
        };
        const result = await axios<Res>(axiosConfig);
        setResponse(result);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setAxiosErrorMessage(err.response.data.message);
          }
        } else if (err instanceof Error) {
          setAxiosErrorMessage(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body, params, headers]);

  return { response, axiosErrorMessage, loading, execute };
}
