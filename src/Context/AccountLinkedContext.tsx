import { createContext } from "react";

export const AccountLinkedContext = createContext({
  accountLinked: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAccountLinked: (_: boolean) => {},
});
