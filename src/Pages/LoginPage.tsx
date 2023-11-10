import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Snackbar,
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
import Copyright from "../Components/Copyright";

const login = async (email: string, password: string) => {
  const response = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const json = await response.json();
    throw new Error(json.error);
  }

  return response.json();
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const context = useContext(UserContext);
  if (!context) {
    throw new Error("LoginPage must be used within a UserProvider");
  }
  const { setUser } = context;

  const handleClose = (
    event:
      | React.SyntheticEvent<Element, Event>
      | React.MouseEvent<Element, MouseEvent>,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userToSignIn = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const userData = await login(userToSignIn.email, userToSignIn.password);

      const user = {
        name: userData.name,
        email: userData.email,
        items: userData.items,
      };
      setUser(user);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown Error");
      }
      setOpen(true);
    }
  };

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
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
