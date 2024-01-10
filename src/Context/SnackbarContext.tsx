import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  ReactElement,
} from "react";
import SnackbarComponent from "../Components/SnackBarComponent";

interface SnackbarMessage {
  message: string;
  severity: "success" | "info" | "warning" | "error";
  key: number;
}

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    severity: SnackbarMessage["severity"]
  ) => void;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}): ReactElement => {
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);

  const showSnackbar = (
    message: string,
    severity: SnackbarMessage["severity"]
  ) => {
    setSnackPack((prev) => [
      ...prev,
      { message, severity, key: new Date().getTime() },
    ]);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackbarComponent snackPack={snackPack} setSnackPack={setSnackPack} />
    </SnackbarContext.Provider>
  );
};
