import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function NetWorth() {
  return (
    <React.Fragment>
      <Title>Net Worth</Title>
      <Typography component="p" variant="h4">
        $ net worth here
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
}
