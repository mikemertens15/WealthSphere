import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Snackbar,
  SnackbarCloseReason,
  Alert,
} from "@mui/material";

import { UserContext } from "../Context/UserContext";
import { useAxios } from "../Hooks/useAxios";
import Copyright from "../Components/Copyright";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  name: string;
  email: string;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("RegistrationPage must be used within a UserProvider");
  }
  const { setUser } = context;

  const { response, axiosErrorMessage, loading, execute } = useAxios<
    RegisterRequest,
    RegisterResponse
  >({
    method: "POST",
    url: "/register",
    body: {
      name,
      email,
      password,
    },
  });

  // Snackbar close handler
  const handleClose = (
    _event: React.SyntheticEvent<unknown, Event> | Event,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Ensure all fields are filled out
  const validateForm = () => {
    if (typeof name !== "string" || name === "") {
      setError("Please provide a name");
      setOpen(true);
      return false;
    }
    if (typeof email !== "string" || email === "") {
      setError("Please provide an email address");
      setOpen(true);
      return false;
    }
    if (typeof password !== "string" || password === "") {
      setError("Please provide a password");
      setOpen(true);
      return false;
    }
    if (typeof confirmPassword !== "string" || confirmPassword === "") {
      setError("Please confirm your password");
      setOpen(true);
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setOpen(true);
      return false;
    }
    return true;
  };

  // Handle register request and either set user or display error
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateForm()) return;
    await execute();
  };

  useEffect(() => {
    if (response !== null) {
      const user = {
        name: response.data.name,
        email: response.data.email,
        numItems: 0,
      };
      setUser(user);
      sessionStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    }
    if (axiosErrorMessage !== null) {
      setError(axiosErrorMessage);
      setOpen(true);
    }
  }, [response, axiosErrorMessage, setUser, navigate]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        py: 3,
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, width: 100, height: 100, bgcolor: "secondary.main" }}
          src="/wealthsphere-logo-maybe.png"
        />
        <Typography component="h1" variant="h5">
          Welcome! Please Create an Account:
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            name="name"
            id="name"
            label="Name"
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            name="email"
            id="email"
            label="Email Address"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            name="password"
            id="password"
            label="Password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            name="confirmPassword"
            id="confirmPassword"
            label="Confirm Password"
            autoComplete="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Registering..." : "Register"}
          </Button>
          <a href="/login">Go Back</a>
        </Box>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default RegistrationPage;
