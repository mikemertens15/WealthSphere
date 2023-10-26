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
import React from "react";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <Dashboard />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AttachMoney />
      </ListItemIcon>
      <ListItemText primary="Budget" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PointOfSale />
      </ListItemIcon>
      <ListItemText primary="Transactions" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AccountBalance />
      </ListItemIcon>
      <ListItemText primary="Balances" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShowChart />
      </ListItemIcon>
      <ListItemText primary="Investments" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <CreditCard />
      </ListItemIcon>
      <ListItemText primary="Debts" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Description />
      </ListItemIcon>
      <ListItemText primary="Bills" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Celebration />
      </ListItemIcon>
      <ListItemText primary="Goals" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Layers />
      </ListItemIcon>
      <ListItemText primary="Accounts" />
    </ListItemButton>
  </React.Fragment>
);
