import {
  Box,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  createTheme,
} from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import AppBarComponent from "../Components/Navbar";
import DrawerComponent from "../Components/Drawer";

const defaultTheme = createTheme();

const TransactionsPage: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Budget must be within a userProvider");
  }

  // const { user } = context;
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
          <h1>The Transactions Page</h1>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TransactionsPage;