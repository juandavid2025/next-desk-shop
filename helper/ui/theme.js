import { createTheme, ThemeProvider } from "@mui/material";
import { purple } from "@mui/material/colors";

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#90caf9",
      dark: "#42a5f5",
      light: "#e3f2fd",
    },
    secondary: {
      main: "#475266",
      dark: "#13161b",
      light: "#8391a9",
    },
  },
});

export default function ThemeAppProvider(props) {
  return <ThemeProvider theme={myTheme}>{props.children}</ThemeProvider>;
}
