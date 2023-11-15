import { useState, useCallback } from "react";

export const useCreateLinkToken = () => {
  const [linkToken, setLinkToken] = useState(null);

  // This function is called when the user clicks on the "Add account" button and officially starts the Link process
  const createLinkToken = useCallback(async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/create_link_token`
    );
    const data = await response.json();
    setLinkToken(data.link_token);
  }, [setLinkToken]);

  return { linkToken, createLinkToken };
};
