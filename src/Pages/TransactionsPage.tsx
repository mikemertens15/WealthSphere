import { useContext, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  CssBaseline,
  ThemeProvider,
  Paper,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Toolbar,
  createTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { UserContext } from "../Context/UserContext";
import { useAxios } from "../Hooks/useAxios";
import Transaction from "../utils/transaction";
import AppBarComponent from "../Components/AppBar";
import DrawerComponent from "../Components/Drawer";
import AddTransactionWizard from "../Components/AddTransactionWizard";

const defaultTheme = createTheme();

interface TransactionsRequest {
  email: string;
}

interface TransactionsResponse {
  transactions: Transaction[];
}

// *Most of this logic should be moved to a separate hook or something*
const TransactionsPage: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Budget must be within a userProvider");
  }
  const { user } = context;
  const email = user?.email;

  const params = useMemo(() => ({ email }), [email]);

  const { response, axiosErrorMessage, loading, execute } = useAxios<
    TransactionsRequest,
    TransactionsResponse
  >({
    method: "GET",
    url: "/get_transactions",
    params,
  });

  const handleOpenWizard = () => {
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (user?.email) execute();
  }, [user?.email, execute]);

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
          {response && (
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Merchant</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Account</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {response.data.transactions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((transaction) => (
                        <TableRow key={transaction._id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.merchant_name}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>{transaction.accountName}</TableCell>
                          <TableCell>{`$${transaction.amount}`}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={response.data.transactions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowPerPage}
              />
            </Paper>
          )}
          {axiosErrorMessage && (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Alert severity="error">{axiosErrorMessage}</Alert>
            </Container>
          )}
          <SpeedDial
            ariaLabel="Add Transaction"
            icon={<SpeedDialIcon />}
            onClick={handleOpenWizard}
          >
            <SpeedDialAction
              key="Add Transaction"
              icon={<Add />}
              tooltipTitle="Add Transaction"
              onClick={handleOpenWizard}
            />
          </SpeedDial>
          <AddTransactionWizard
            open={isWizardOpen}
            onClose={handleCloseWizard}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TransactionsPage;
