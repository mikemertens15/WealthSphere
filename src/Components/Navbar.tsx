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
import { useNavigate } from "react-router-dom";
import { useCreateLinkToken } from "../Hooks/useCreateLinkToken";
import { usePlaidConfig } from "../Hooks/usePlaidConfig";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import React from "react";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  open,
  toggleDrawer,
}) => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Appbar must be within UserProvider");
  }
  const { user } = context;
  const { linkToken, createLinkToken } = useCreateLinkToken();
  const { openPlaid, ready } = usePlaidConfig(user, linkToken);

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
          {user ? user.name : "undefined"}'s Dashboard
        </Typography>
        <Button
          variant="text"
          onClick={() => createLinkToken()}
          endIcon={<Add />}
          sx={{ color: "white" }}
        >
          Add Account
        </Button>
        <IconButton onClick={() => navigate("/login")} color="inherit">
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
