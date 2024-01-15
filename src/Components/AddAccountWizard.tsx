import { useState, useContext, useEffect } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { UserContext } from "../Context/UserContext";
import { useSnackbar } from "../Context/SnackbarContext";
import { useAxios } from "../Hooks/useAxios";

interface AddAccountWizardProps {
  open: boolean;
  onClose: () => void;
}

interface AddAccountRequest {
  email: string | undefined;
  account_name: string;
  account_type: string;
  account_balance: number;
}

interface AddAccountResponse {
  message: string;
}

const AddAccountWizard: React.FC<AddAccountWizardProps> = ({
  open,
  onClose,
}) => {
  const [accountName, setAccountName] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountBalance, setAccountBalance] = useState(0);
  const { showSnackbar } = useSnackbar();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginPage must be used within a UserProvider");
  }
  const { user } = context;

  const { response, axiosErrorMessage, loading, execute } = useAxios<
    AddAccountRequest,
    AddAccountResponse
  >({
    method: "POST",
    url: "/add_manual_account",
    body: {
      email: user?.email,
      account_name: accountName,
      account_type: accountType,
      account_balance: accountBalance,
    },
  });

  const handleFinish = async () => {
    await execute();
  };

  useEffect(() => {
    if (axiosErrorMessage) {
      showSnackbar(axiosErrorMessage, "error");
    }
    if (response?.data.message == "Success") {
      showSnackbar("Account added successfully!", "success");
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [axiosErrorMessage, response, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add Account</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <TextField
            label="Account Name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="account-type-label">Account Type</InputLabel>
          <Select
            labelId="account-type-label"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value as string)}
          >
            <MenuItem value="Checking">Checking</MenuItem>
            <MenuItem value="Savings">Savings</MenuItem>
            <MenuItem value="Credit">Credit</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Account Balance"
            value={accountBalance}
            onChange={(e) => setAccountBalance(parseInt(e.target.value))}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleFinish} disabled={loading}>
          {loading ? <CircularProgress /> : "Finish"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAccountWizard;
