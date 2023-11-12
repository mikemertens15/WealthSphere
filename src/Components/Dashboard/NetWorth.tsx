import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

interface NetWorthProps {
  netWorth: number | null;
}

// Display the user's net worth, with a link to view all of their accounts
const NetWorth: React.FC<NetWorthProps> = ({ netWorth }) => {
  return (
    <React.Fragment>
      <Title>Net Worth</Title>
      <Typography component="p" variant="h4">
        {netWorth
          ? "$" + netWorth
          : "No accounts Linked! Please link an account"}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        last updated here?
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View accounts
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NetWorth;
