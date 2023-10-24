import { Link, Typography, TypographyProps } from "@mui/material";
import { SystemProps } from "@mui/system";

type CopyrightProps = TypographyProps & { sx?: SystemProps };

const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="google.com">
        {" "}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
