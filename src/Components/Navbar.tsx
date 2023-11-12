import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu, Logout, Add } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useCreateLinkToken } from "../Hooks/useCreateLinkToken";
import { usePlaidConfig } from "../Hooks/usePlaidConfig";
import { UserContext } from "../Context/UserContext";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// Defines the style and opening animation of the menu drawer
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

interface AppBarComponentProps {
  open: boolean;
  toggleDrawer: () => void;
  handleAccountLinkSuccess: () => void;
}

// AppBar component that displays the menu icon, page title, add account button, and logout button
const AppBarComponent: React.FC<AppBarComponentProps> = ({
  open,
  toggleDrawer,
  handleAccountLinkSuccess,
}) => {
  const navigate = useNavigate();

  // Get user from context
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Appbar must be within UserProvider");
  }
  const { user } = context;

  // Plaid Hooks
  const { linkToken, createLinkToken } = useCreateLinkToken();
  const { openPlaid, ready } = usePlaidConfig(
    user,
    linkToken,
    handleAccountLinkSuccess
  );

  // On logout, remove user from session storage and context, then navigate to login page
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    context.setUser(null);
    navigate("/login");
  };

  // When add account button is clicked, linkToken is created and then Plaid is opened
  useEffect(() => {
    if (ready) {
      openPlaid();
    } else {
      console.log("openPlaid useEffect ran but is not ready");
    }
  }, [ready, openPlaid, linkToken]);

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {user ? user.name : "undefined"}'s Dashboard{" "}
          {/* TODO: shouldn't even be displaying navbar if user not logged in*/}
        </Typography>
        <Button
          variant="text"
          onClick={() => createLinkToken()}
          endIcon={<Add />}
          sx={{ color: "white" }}
        >
          Add Account
        </Button>
        <IconButton onClick={handleLogout} color="inherit">
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
