import React from "react";
import {
  Drawer as MuiDrawer,
  Toolbar,
  List,
  Divider,
  IconButton,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { menuItems } from "./Dashboard/menuItems";

const drawerWidth: number = 240;

// Defines the style and opening animation of the menu drawer
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface DrawerComponentProps {
  open: boolean;
  toggleDrawer: () => void;
}

// Drawer component that displays the full menu items
const DrawerComponent: React.FC<DrawerComponentProps> = ({
  open,
  toggleDrawer,
}) => {
  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">{menuItems}</List>
    </Drawer>
  );
};

export default DrawerComponent;
