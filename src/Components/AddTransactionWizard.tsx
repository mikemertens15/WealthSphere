import React, { useState, useEffect } from "react";
import { primaryFinanceCategories } from "../utils/financeCategories";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { Dayjs } from "dayjs";

interface AddTransactionWizardProps {
  userEmail: string | undefined;
  open: boolean;
  onClose: () => void;
}

// User can manually input a transaction by filling out the form, which is then sent to the backend and transaction is added to the user's transactions
const AddTransactionWizard: React.FC<AddTransactionWizardProps> = ({
  userEmail,
  open,
  onClose,
}) => {
  const [accounts, setAccounts] = useState([]);
  const [merchant, setMerchant] = useState("");
  const [category, setCategory] = useState("");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState<Dayjs | null>(null);

  // Sends the user's budget to the backend
  const handleFinish = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/add_manual_transaction`,
        {
          email: userEmail,
          merchant_name: merchant,
          category: category,
          account: account,
          amount: amount,
          date: date?.format("YYYY-MM-DD"),
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  useEffect(() => {
    if (open) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/get_accounts`)
        .then((res) => {
          setAccounts(res.data.accounts);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [open, userEmail]);

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
            {primaryFinanceCategories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="account-label">Account</InputLabel>
          <Select
            labelId="account-label"
            id="account"
            value={account}
            label="Account"
            onChange={(e) => setAccount(e.target.value)}
          >
            {accounts.map((account) => (
              <MenuItem value={account}>{account}</MenuItem>
            ))}
            {accounts.map((account, index) => (
              <MenuItem key={index} value={account}>
                {account}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleFinish}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionWizard;
