import { useCallback } from "react";
import { User } from "../Context/UserContext";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";

export const usePlaidConfig = (user: User | null, linkToken: string | null) => {
  // need to protect against the linkToken being null
  const config: PlaidLinkOptions = {
    onSuccess: useCallback<PlaidLinkOnSuccess>(
      async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
        console.log(metadata);
        const response = await fetch(
          "http://localhost:3001/api/exchange_public_token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              public_token: public_token,
              userEmail: user!.email,
            }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        }
      },
      [user]
    ),
    onExit: (err, metadata) => {
      if (err) {
        console.log(err);
      } else {
        console.log(metadata);
      }
    },
    onEvent: (eventName, metadata) => {
      console.log(eventName, metadata);
    },
    token: linkToken,
  };

  const { open, ready } = usePlaidLink(config);
  const openPlaid = open;
  return { openPlaid, ready };
};
