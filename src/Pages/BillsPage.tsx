import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  createTheme,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/AppBar";
import DrawerComponent from "../Components/Drawer";
import usePostData from "../Hooks/usePostData";

interface Bill {
  name: string;
  amount: number;
  dueDate: string;
}

const defaultTheme = createTheme();

const BillsPage: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Budget must be within a userProvider");
  }

  const { user } = context;
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { postData } = usePostData("add_new_bill", user?.email);
  const [bills, setBills] = useState<Bill[]>([]);
  const [billName, setBillName] = useState("");
  const [billAmount, setBillAmount] = useState("");
  const [billDueDate, setBillDueDate] = useState("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveBill = () => {
    postData({ name: billName, amount: billAmount, dueDate: billDueDate });
    handleCloseDialog();
  };

  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/get_balance_page_data?email=${
        user?.email
      }`
    );
    setBills(response.data.bills);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent open={open} toggleDrawer={toggleDrawer} />
        <DrawerComponent open={open} toggleDrawer={toggleDrawer} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box sx={{ margin: 3 }}>
            <Typography variant="h4" gutterBottom>
              Bills
            </Typography>
            <List>
              {bills.map((bill, index) => (
                <ListItem key={index}>
                  <Card sx={{ width: "100%" }}>
                    <CardContent>
                      <Typography variant="h6">{bill.name}</Typography>
                      <Typography>Amount: {bill.amount}</Typography>
                      <Typography>Due Date: {bill.dueDate}</Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleOpenDialog}
              >
                Add Bill
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add a new bill</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Bill Title"
            type="text"
            fullWidth
            variant="standard"
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={billAmount}
            onChange={(e) => setBillAmount(e.target.value)}
          />
          <TextField
            margin="dense"
            id="dueDate"
            label="Due Date"
            type="text"
            fullWidth
            variant="standard"
            value={billDueDate}
            onChange={(e) => setBillDueDate(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveBill}>Save</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default BillsPage;
