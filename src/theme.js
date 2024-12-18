import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
// Create a theme instance.
// resource : https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({
  Trello: {
    appBarHeight: "48px",
    boardBarHeight: "56px",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: ``, // This is global theme overrides
        },
      },
      // spacing: (factor) => `${0.25 * factor}rem`,
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange,
      },
      // spacing : (factor) => `${0.25 * factor}rem`
    },
  },
});

export default theme;
