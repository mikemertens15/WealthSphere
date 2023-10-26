import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

// Generate Order Data
function createData(
  id: number,
  date: string,
  name: string,
  shipTo: string,
  paymentMethod: string,
  amount: number
) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Stop & Shop",
    "Groceries",
    "Chase Checking",
    210.14
  ),
  createData(
    1,
    "16 Mar, 2019",
    "AMC Corp",
    "Movies & Entertainment",
    "Amex Gold Card",
    45.48
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Walmart",
    "Groceries & Shopping",
    "Amex Gold Card",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "PSEG LI",
    "Utilities - Power",
    "Chase Checking",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Payment -- THANK YOU",
    "Credit card payment",
    "Chase Checking",
    212.79
  ),
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Transactions() {
  return (
    <React.Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Merchant</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Account</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See all Transactions
      </Link>
    </React.Fragment>
  );
}
