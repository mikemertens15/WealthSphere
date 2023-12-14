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
  IconButton,
} from "@mui/material";
import { Settings, Add } from "@mui/icons-material";
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/AppBar";
import DrawerComponent from "../Components/Drawer";

const defaultTheme = createTheme();

const AccountsPage: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Budget must be within a userProvider");
  }

  // const { user } = context;
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const accounts = [{ accountName: "Checking" }, { accountName: "Savings" }];

  const handleAddAccount = () => {
    console.log("Add account");
  };

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
              Linked Accounts
            </Typography>
            <List>
              {accounts.map((account, index) => (
                <ListItem key={index}>
                  <Card
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">
                        {account.accountName}
                      </Typography>
                    </CardContent>
                    <IconButton
                      onClick={() =>
                        console.log("Add some settings to alter the account")
                      }
                    >
                      <Settings />
                    </IconButton>
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
                onClick={handleAddAccount}
              >
                Add Account
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AccountsPage;
