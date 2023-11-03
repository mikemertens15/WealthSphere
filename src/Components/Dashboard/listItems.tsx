import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import {
  Dashboard,
  AccountBalance,
  PointOfSale,
  AttachMoney,
  ShowChart,
  CreditCard,
  Description,
  Celebration,
  Layers,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import React from "react";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard">
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/budget">
      <ListItemIcon>
        <AttachMoney />
      </ListItemIcon>
      <ListItemText primary="Budget" />
    </ListItemButton>
    <ListItemButton component={Link} to="/transactions">
      <ListItemIcon>
        <PointOfSale />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItemButton>
    <ListItemButton component={Link} to="/balances">
      <ListItemIcon>
        <AccountBalance />
      </ListItemIcon>
      <ListItemText primary="Balances" />
    </ListItemButton>
    <ListItemButton component={Link} to="/investments">
      <ListItemIcon>
        <ShowChart />
      </ListItemIcon>
      <ListItemText primary="Investments" />
    </ListItemButton>
    <ListItemButton component={Link} to="/debts">
      <ListItemIcon>
        <CreditCard />
      </ListItemIcon>
      <ListItemText primary="Debts" />
    </ListItemButton>
    <ListItemButton component={Link} to="/bills">
      <ListItemIcon>
        <Description />
      </ListItemIcon>
      <ListItemText primary="Bills" />
    </ListItemButton>
    <ListItemButton component={Link} to="/goals">
      <ListItemIcon>
        <Celebration />
      </ListItemIcon>
      <ListItemText primary="Goals" />
    </ListItemButton>
    <ListItemButton component={Link} to="/accounts">
      <ListItemIcon>
        <Layers />
      </ListItemIcon>
      <ListItemText primary="Accounts" />
    </ListItemButton>
  </React.Fragment>
);
