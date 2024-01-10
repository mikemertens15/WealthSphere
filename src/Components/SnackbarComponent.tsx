import React, { useEffect, useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface SnackbarMessage {
  message: string;
  severity: AlertColor;
  key: number;
}

interface SnackbarComponentProps {
  snackPack: SnackbarMessage[];
  setSnackPack: React.Dispatch<React.SetStateAction<SnackbarMessage[]>>;
}

const SnackbarComponent: React.FC<SnackbarComponentProps> = ({
  snackPack,
  setSnackPack,
}) => {
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState<SnackbarMessage | undefined>(undefined);

  useEffect(() => {
    if (snackPack.length && !snack) {
      setSnack({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && snack && open) {
      setOpen(false);
    }
  }, [snackPack, setSnackPack, snack, open]);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
    setSnack(undefined);
  };

  return (
    <Snackbar
      key={snack?.key}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snack?.severity}
        sx={{ width: "100%" }}
      >
        {snack?.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
