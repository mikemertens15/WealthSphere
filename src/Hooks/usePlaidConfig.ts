import { useCallback } from "react";
import { User, UserContextProps } from "../Context/UserContext";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";

export const usePlaidConfig = (
  user: User | null,
  addItemToUser: UserContextProps["addItemToUser"],
  linkToken: string | null
) => {
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
        const data = await response.json();
        if (response.ok) {
          addItemToUser(data.itemId);
          // setAccountLinked(true);
        }
      },
      [addItemToUser, user]
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

  return { open, ready };
};
