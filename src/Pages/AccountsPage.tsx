import { useContext, useMemo, useState, useEffect } from "react";
import {
  Box,
  Container,
  CssBaseline,
  createTheme,
  Paper,
  ThemeProvider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Toolbar,
  CircularProgress,
  Alert,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { UserContext } from "../Context/UserContext";
import { useAxios } from "../Hooks/useAxios";
import Account from "../utils/account";
import AppBarComponent from "../Components/AppBar";
import DrawerComponent from "../Components/Drawer";
import AddAccountWizard from "../Components/AddAccountWizard";

const defaultTheme = createTheme();

interface AccountsRequest {
  email: string;
}

interface AccountsResponse {
  accounts: Account[];
}

const AccountsPage: React.FC = () => {
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
    AccountsRequest,
    AccountsResponse
  >({
    method: "GET",
    url: "/get_accounts_page_data",
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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
          {response && (
            <Paper>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Account Name</TableCell>
                      <TableCell>Account Type</TableCell>
                      <TableCell>Account Balance</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {response.data.accounts
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((account) => (
                        <TableRow key={account._id}>
                          <TableCell>{account.accountName}</TableCell>
                          <TableCell>{account.accountType}</TableCell>
                          <TableCell>{account.currentBalance}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={response.data.accounts.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
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
            ariaLabel="Add Account"
            icon={<SpeedDialIcon />}
            onClick={handleOpenWizard}
          >
            <SpeedDialAction
              icon={<Add />}
              tooltipTitle="Add Account"
              onClick={handleOpenWizard}
            />
          </SpeedDial>
          <AddAccountWizard open={isWizardOpen} onClose={handleCloseWizard} />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AccountsPage;
