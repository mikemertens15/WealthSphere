import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  Alert,
  Button,
  CircularProgress,
  // Link,
} from "@mui/material";
import { UserContext } from "../Context/UserContext";
import { AccountLinkedContext } from "../Context/AccountLinkedContext";
import { useAxios } from "../Hooks/useAxios";
import Transaction from "../utils/transaction";
import Copyright from "../Components/Copyright";
import AppBarComponent from "../Components/AppBar";
// import Budget from "../Components/Dashboard/Budget";
import NetWorth from "../Components/Dashboard/NetWorth";
import Transactions from "../Components/Dashboard/Transactions";
import DrawerComponent from "../Components/Drawer";

const defaultTheme = createTheme();

interface DashBoardRequest {
  email: string;
}

interface DashBoardResponse {
  netWorth: number;
  recentTransactions: Transaction[];
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // get the user from the context
  const userContext = useContext(UserContext);
  const { accountLinked } = useContext(AccountLinkedContext);
  if (!userContext) {
    throw new Error("Dashboard must be within a userProvider!");
  }
  const { user, setUser } = userContext;
  const email = user?.email;

  const params = useMemo(() => ({ email }), [email]);

  const { response, axiosErrorMessage, loading, execute } = useAxios<
    DashBoardRequest,
    DashBoardResponse
  >({
    method: "GET",
    url: "/get_dashboard_data",
    params,
  });

  // handle deleting plaid items for development and testing purposes
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
    navigate("/login");
  };

  // handle open and close of the drawer
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // fetch the dashboard data on mount and when the user's account is linked
  useEffect(() => {
    if (user?.email) execute();
  }, [user?.email, execute, accountLinked]);

  useEffect(() => {
    const sessionUserData = sessionStorage.getItem("user");
    if (sessionUserData) {
      setUser(JSON.parse(sessionUserData));
    }
  }, [setUser]);

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
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          )}

          {!loading && !axiosErrorMessage && (
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
                    <h1>Budget Widget in progress</h1>
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
                    <NetWorth netWorth={response?.data.netWorth || 0} />
                  </Paper>
                </Grid>
                {/* Recent Transactions */}
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: "flex", flexDirection: "column" }}
                  >
                    <Transactions
                      userEmail={user?.email}
                      recentTransactions={
                        response?.data.recentTransactions || []
                      }
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Button onClick={handleDeletePlaidItems}>Delete</Button>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          )}

          {axiosErrorMessage && (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Alert severity="error">{axiosErrorMessage}</Alert>
              <Button onClick={execute}>Try Again</Button>
            </Container>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
