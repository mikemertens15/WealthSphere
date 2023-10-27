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
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/Navbar";
import DrawerComponent from "../Components/Drawer";

const defaultTheme = createTheme();

export default function DashboardV2() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a userProvider!");
  }
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
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
                  <Budget />
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
                  <NetWorth />
                </Paper>
              </Grid>
              {/* Recent Transactions */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Transactions />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
