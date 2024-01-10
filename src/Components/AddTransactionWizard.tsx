import { useState, useContext, useEffect } from "react";
import { Dayjs } from "dayjs";
import { primaryFinanceCategories } from "../utils/financeCategories";
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
import { DatePicker } from "@mui/x-date-pickers";
import { UserContext } from "../Context/UserContext";
import { useSnackbar } from "../Context/SnackbarContext";
import { useAxios } from "../Hooks/useAxios";

interface AddTransactionWizardProps {
  open: boolean;
  onClose: () => void;
}

interface AddTransactionRequest {
  email: string | undefined;
  merchant_name: string;
  category: string;
  account: string;
  amount: number;
  date: string | undefined;
}

interface AddTransactionResponse {
  message: string;
}

// User can manually input a transaction by filling out the form, which is then sent to the backend and transaction is added to the user's transactions
const AddTransactionWizard: React.FC<AddTransactionWizardProps> = ({
  open,
  onClose,
}) => {
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Dayjs | null>(null);
  const { showSnackbar } = useSnackbar();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginPage must be used within a UserProvider");
  }
  const { user } = context;

  const { response, axiosErrorMessage, loading, execute } = useAxios<
    AddTransactionRequest,
    AddTransactionResponse
  >({
    method: "POST",
    url: "/add_manual_transaction",
    body: {
      email: user?.email,
      merchant_name: merchant,
      category: category,
      account: account,
      amount: amount,
      date: date?.format("YYYY-MM-DD"),
    },
  });

  // Sends the user's budget to the backend
  const handleFinish = async () => {
    await execute();
  };

  useEffect(() => {
    if (axiosErrorMessage) {
      showSnackbar(axiosErrorMessage, "error");
    }
    if (response?.data.message === "Success") {
      showSnackbar("Transaction added successfully", "success");
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, axiosErrorMessage, onClose]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Add a Transaction</DialogTitle>
      <DialogContent>
        <DatePicker value={date} onChange={setDate} />
        <TextField
          autoFocus
          margin="dense"
          id="Merchant"
          label="Merchant"
          type="text"
          onChange={(e) => setMerchant(e.target.value)}
          variant="standard"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {primaryFinanceCategories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="Account"
          label="Account"
          type="text"
          onChange={(e) => setAccount(e.target.value)}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="Amount"
          label="Amount"
          type="number"
          onChange={(e) => setAmount(parseInt(e.target.value))}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleFinish} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Finish"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionWizard;
