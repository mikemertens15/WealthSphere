import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

interface TransactionsProps {
  recentTransactions: {
    _id: string;
    amount: number;
    accountName: string;
    category: string;
    date: string;
    merchant_name: string;
    plaidItem: string;
  }[];
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

// Receives a list of the user's recent transactions and displays them in a table
const Transactions: React.FC<TransactionsProps> = ({ recentTransactions }) => {
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
          {recentTransactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.merchant_name}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>{transaction.accountName}</TableCell>
              <TableCell align="right">{`$${transaction.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See all Transactions
      </Link>
    </React.Fragment>
  );
};

export default Transactions;
