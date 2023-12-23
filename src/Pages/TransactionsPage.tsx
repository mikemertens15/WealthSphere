import { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
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
import AppBarComponent from "../Components/AppBar";
import DrawerComponent from "../Components/Drawer";
import AddTransactionWizard from "../Components/AddTransactionWizard";

const defaultTheme = createTheme();

interface Transaction {
  transaction_id: string;
  amount: number;
  account: string;
  category: string;
  date: string;
  merchant_name: string;
}

// *Most of this logic should be moved to a separate hook or something*
const TransactionsPage: React.FC = () => {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [open, setOpen] = useState(false);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Budget must be within a userProvider");
  }
  const { user } = context;

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
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/get_transactions?email=${user?.email}`
      )
      .then((res) => {
        setTransactions(res.data.transactions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.email]);

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
                  {transactions &&
                    transactions
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((transaction) => (
                        <TableRow key={transaction.transaction_id}>
                          <TableCell>{transaction.date}</TableCell>
                          <TableCell>{transaction.merchant_name}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>{transaction.account}</TableCell>
                          <TableCell>{`$${transaction.amount}`}</TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowPerPage}
            />
          </Paper>
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
            userEmail={user?.email}
            open={isWizardOpen}
            onClose={handleCloseWizard}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TransactionsPage;
