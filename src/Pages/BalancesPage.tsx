import {
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  createTheme,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/AppBar";
import DrawerComponent from "../Components/Drawer";
import axios from "axios";

const defaultTheme = createTheme();

interface Account {
  accountName: string;
  balances: {
    current: number;
  };
}

const BalancesPage: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Budget must be within a userProvider");
  }
  const { user } = context;

  // const { user } = context;
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [netWorth, setNetWorth] = React.useState(0);
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddBalance = () => {
    // Add account to db and refresh page
    handleCloseDialog();
  };

  const fetchData = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/get_balance_page_data?email=${
        user?.email
      }`
    );
    setNetWorth(response.data.netWorth);
    setAccounts(response.data.accounts);
  };

  React.useEffect(() => {
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
              Total Net Worth: ${netWorth.toLocaleString()}
            </Typography>
            <List>
              {accounts.map((account, index) => (
                <ListItem key={index}>
                  <Card sx={{ width: "100%" }}>
                    <CardContent>
                      <Typography variant="h6">
                        {account.accountName}
                      </Typography>
                      <Typography>
                        ${account.balances.current.toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                </ListItem>
              ))}
            </List>
            <Button variant="outlined" onClick={handleOpenDialog}>
              Add Balance
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add Balance</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="balance"
            label="Balance"
            type="number"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddBalance}>Add</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default BalancesPage;
