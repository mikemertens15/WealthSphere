import { useCallback } from "react";
import { User } from "../Context/UserContext";
import {
  usePlaidLink,
  PlaidLinkOptions,
  PlaidLinkOnSuccess,
  PlaidLinkOnSuccessMetadata,
} from "react-plaid-link";

export const usePlaidConfig = (
  user: User | null,
  linkToken: string | null,
  onLinkSuccess: () => void
) => {
  // Configures the plaid link component with the link token provided by the server
  // When user is done with the link process, the onSuccess callback is called
  // The onSuccess callback sends the public token to the server to exchange for an access token
  // The access token is then stored in the database, along with the initial account data
  const config: PlaidLinkOptions = {
    onSuccess: useCallback<PlaidLinkOnSuccess>(
      async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
        console.log(metadata);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_PRODUCTION}/exchange_public_token`,
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
          onLinkSuccess();
        }
      },
      [user, onLinkSuccess]
    ),

    // This function is called when the user exits the Link flow without linking any accounts or if the Link flow errored out
    // The function should delete the link_token from state and gracefully inform the user that the process was unsuccessful
    onExit: (err, metadata) => {
      if (err) {
        console.log(err);
      } else {
        console.log(metadata);
      }
    },

    // Called at certain points throughout the Link flow with status updates
    onEvent: (eventName, metadata) => {
      console.log(eventName, metadata);
    },
    token: linkToken, // need to protect against the linkToken being null
  };

  const { open, ready } = usePlaidLink(config);
  const openPlaid = open; // renamed for clarity and avoid conflict with drawer open state
  return { openPlaid, ready };
};
