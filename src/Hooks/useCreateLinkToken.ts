import { useState, useCallback } from "react";

export const useCreateLinkToken = () => {
  const [linkToken, setLinkToken] = useState(null);

  const createLinkToken = useCallback(async () => {
    const response = await fetch("http://localhost:3001/api/create_link_token");
    const data = await response.json();
    setLinkToken(data.link_token);
  }, [setLinkToken]);

  return { linkToken, createLinkToken };
};
