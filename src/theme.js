import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
// resource : https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({
  cssVariables: true,
  palette: {
    // Bộ màu theme custom
    mode: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    text: {
      primary: "",
      disabled: "",
      secondary: red[500],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
