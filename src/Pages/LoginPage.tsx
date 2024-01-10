import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link as Material_Link,
  Avatar,
} from "@mui/material";

import { UserContext } from "../Context/UserContext";
import { useSnackbar } from "../Context/SnackbarContext";

import Copyright from "../Components/Copyright";
import { useAxios } from "../Hooks/useAxios";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  name: string;
  email: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { showSnackbar } = useSnackbar();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginPage must be used within a UserProvider");
  }
  const { setUser } = context;

  const { response, axiosErrorMessage, loading, execute } = useAxios<
    LoginRequest,
    LoginResponse
  >({
    method: "POST",
    url: "/login",
    body: {
      email,
      password,
    },
  });

  // Ensure all fields are filled out
  const validateForm = () => {
    if (typeof email !== "string" || email === "") {
      showSnackbar("Please provide an email", "error");
      return false;
    }
    if (typeof password !== "string" || password === "") {
      showSnackbar("Please provide a password", "error");
      return false;
    }
    return true;
  };

  // Handle login request and either set user or display error
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
      showSnackbar(axiosErrorMessage, "error");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="filled"
            name="email"
            id="email"
            label="email address"
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
            label="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Material_Link href="#" variant="body2">
                Forgot Password?
              </Material_Link>
            </Grid>
            <Grid item>
              <Material_Link href="/register" variant="body2">
                {"Don't have an Account? Sign Up"}
              </Material_Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
