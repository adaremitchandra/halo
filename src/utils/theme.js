import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const base = createTheme({
  palette: {
    primary: {
      main: "#0098FA",
    },
    secondary: {
      main: "#7792BC",
    },
    tertiary: {
      main: "#E6F4F1",
    },
    light: {
      main: "#F4FAFF",
    },
    error: {
      main: red[400],
    },
  },
});

const theme = responsiveFontSizes(base);

export default theme;
