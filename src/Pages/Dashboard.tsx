import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import Budget from "../Components/Dashboard/Budget";
import NetWorth from "../Components/Dashboard/NetWorth";
import Transactions from "../Components/Dashboard/Transactions";
import Copyright from "../Components/Copyright";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/Navbar";
import DrawerComponent from "../Components/Drawer";
import Link from "@mui/material/Link";
import BudgetSetupWizard from "../Components/BudgetSetupWizard";

const defaultTheme = createTheme();

// TODO: Add persistance so logged in user isn't lost on refresh

const Dashboard: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a userProvider!");
  }

  const { user } = context;
  const [open, setOpen] = React.useState(false);
  const [netWorth, setNetWorth] = React.useState(null);
  const [recentTransactions, setRecentTransactions] = React.useState([]);
  const [userHasBudget, setUserHasBudget] = React.useState(false);
  const [setupWindowOpen, setSetupWizardOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleOpenSetupWizard = () => {
    setSetupWizardOpen(true);
  };

  const handleCloseSetupWizard = () => {
    setSetupWizardOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get_dashboard_data?email=${user?.email}`)
      .then((response) => {
        setNetWorth(response.data.netWorth);
        setRecentTransactions(response.data.recentTransactions);
        setUserHasBudget(response.data.budget.hasBudget);
      })
      .catch((error) => {
        console.log("Error fetching net worth: " + error);
      });
  }, [user]);

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
                    <Budget />
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
                  <Transactions recentTransactions={recentTransactions} />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
