import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Budget from "../Components/Dashboard/Budget";
import NetWorth from "../Components/Dashboard/NetWorth";
import Transactions from "../Components/Dashboard/Transactions";
import Copyright from "../Components/Copyright";
import React, { useContext, useEffect } from "react";
import useDashboardData from "../Hooks/useDashboardData";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/Navbar";
import DrawerComponent from "../Components/Drawer";
import Link from "@mui/material/Link";
import BudgetSetupWizard from "../Components/BudgetSetupWizard";

const defaultTheme = createTheme();

// TODO: Add persistance so logged in user isn't lost on refresh

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [setupWindowOpen, setSetupWizardOpen] = React.useState(false);

  // get the user from the context
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a userProvider!");
  }
  const { user } = context;

  // get data for the dashboard
  const { netWorth, income, recentTransactions, userHasBudget, fetchData } =
    useDashboardData(user?.email);

  const handleAccountLinkSuccess = () => {
    if (fetchData) {
      fetchData();
    }
  };

  const handleDeletePlaidItems = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/delete_plaid_items`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: user?.email }),
      }
    );

    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.error);
    }

    sessionStorage.removeItem("user");
    navigate("/login");
  };

  // handle open and close of the drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // handle open and close of the budget setup wizard
  const handleOpenSetupWizard = () => {
    setSetupWizardOpen(true);
  };
  const handleCloseSetupWizard = () => {
    setSetupWizardOpen(false);
  };

  // useEffect for session storage
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      context.setUser(JSON.parse(storedUser));
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent
          open={open}
          toggleDrawer={toggleDrawer}
          handleAccountLinkSuccess={handleAccountLinkSuccess}
        />
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  {userHasBudget ? (
                    <Budget income={income} />
                  ) : (
                    <Link
                      color="primary"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleOpenSetupWizard();
                      }}
                    >
                      Create a Budget!
                    </Link>
                  )}
                  <BudgetSetupWizard
                    userEmail={user?.email}
                    open={setupWindowOpen}
                    onClose={handleCloseSetupWizard}
                  />
                </Paper>
              </Grid>
              {/* Net Worth */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                  }}
                >
                  <NetWorth netWorth={netWorth} />
                </Paper>
              </Grid>
              {/* Recent Transactions */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Transactions recentTransactions={recentTransactions || []} />
                </Paper>
              </Grid>
            </Grid>
            <Button onClick={handleDeletePlaidItems}>Delete</Button>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
