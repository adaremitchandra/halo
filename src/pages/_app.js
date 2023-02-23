import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import theme from "../utils/theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
