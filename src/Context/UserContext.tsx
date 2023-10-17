import React, { createContext, useState, ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  items: string[];
}

export interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  addItemToUser: (itemId: string) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const addItemToUser = (itemId: string) => {
    if (user) {
      const updatedItems = user.items ? [...user.items, itemId] : [itemId];
      setUser({
        ...user,
        items: updatedItems,
      });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, addItemToUser }}>
      {children}
    </UserContext.Provider>
  );
};
