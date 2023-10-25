import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Transactions from "../Components/Transactions";
import MenuIcon from "@mui/icons-material/Menu";

import { useCreateLinkToken } from "../Hooks/useCreateLinkToken";
import { useFetchTransactions } from "../Hooks/useFetchTransactions";
import { usePlaidConfig } from "../Hooks/usePlaidConfig";
import Navbar from "../Components/Navbar";
import { useFetchBalance } from "../Hooks/useFetchBalance";
import Balance from "../Components/Balance";
import { Box, Container, CssBaseline, Grid, Paper } from "@mui/material";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Dashboard must be within a UserProvider");
  }

  const { user, addItemToUser, setUser } = context;
  // setUser({
  //   name: "Mik",
  //   email: "admin@admin.com",
  //   items: ["KjLDoXM39PsqVxzRnj7bu9mJbmb7bkURMeDlk"],
  // });

  const [accountLinked, setAccountLinked] = useState<boolean>(false); // needs to come from the user context
  const { linkToken, createLinkToken } = useCreateLinkToken();
  const { transactions, fetchTransactions } = useFetchTransactions(user);
  const { balance, fetchBalance } = useFetchBalance(user);
  const { open, ready } = usePlaidConfig(user, addItemToUser, linkToken);

  useEffect(() => {
    if (user && user.items && user.items.length >= 1) {
      setAccountLinked(true);
    }
  }, [user]);

  useEffect(() => {
    if (linkToken == null) {
      createLinkToken();
    }
    // if (isOauth && ready) {
    //   open();
    // }
  }, [createLinkToken, linkToken]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Box
        component="main"
        sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                Hello
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
