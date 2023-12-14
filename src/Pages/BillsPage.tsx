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
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/AppBar";
import DrawerComponent from "../Components/Drawer";

const defaultTheme = createTheme();

const BillsPage: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Budget must be within a userProvider");
  }

  // const { user } = context;
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [newBill, setNewBill] = React.useState({
    title: "",
    amount: "",
    dueDate: "",
  });

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
    console.log("New bill");
    handleCloseDialog();
  };

  const bills = [
    { title: "Rent", amount: "1000", dueDate: "1st" },
    { title: "Netflix", amount: "15", dueDate: "15th" },
  ];

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
                      <Typography variant="h6">{bill.title}</Typography>
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
            value={newBill.title}
            onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="amount"
            label="Amount"
            type="number"
            fullWidth
            variant="standard"
            value={newBill.amount}
            onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
          />
          <TextField
            margin="dense"
            id="dueDate"
            label="Due Date"
            type="text"
            fullWidth
            variant="standard"
            value={newBill.dueDate}
            onChange={(e) =>
              setNewBill({ ...newBill, dueDate: e.target.value })
            }
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
