import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

const Card = ({ label, title, href, icon, value }) => {
  return (
    <Link href={href || "/"}>
      <Box
        sx={{
          borderRadius: "16px",
          height: "150px",
          padding: "24px",
          boxShadow:
            "0 4px 6px -1px rgb(0,0,0,0.1), 0 2px 4px -2px rgb(0,0,0,0.1)",
          WebkitBoxShadow:
            "0 4px 6px -1px rgb(0,0,0,0.1), 0 2px 4px -2px rgb(0,0,0,0.1)",
          MozBoxShadow:
            "0 4px 6px -1px rgb(0,0,0,0.1), 0 2px 4px -2px rgb(0,0,0,0.1)",
          bgcolor: "white",
        }}
      >
        <Typography component="p" fontSize={16} color="teal" fontWeight="700">
          {label}
        </Typography>
        <Typography component="h2" fontWeight="bold" fontSize={18}>
          {title}
        </Typography>
        <Grid
          container
          alignItems="center"
          justify="flex-end"
          sx={{ marginY: "8px" }}
        >
          <Grid item sx={{ marginRight: "8px" }}>
            {icon}
          </Grid>
          {value && (
            <Grid item>
              <Typography
                component="p"
                fontWeight="bold"
                fontSize={30}
                color="primary"
              >
                {value}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </Link>
  );
};

export default Card;
