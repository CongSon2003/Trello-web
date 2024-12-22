import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
// Create a theme instance.
// resource : https://mui.com/material-ui/customization/default-theme/
const theme = createTheme({
  Trello: {
    appBarHeight: "58px",
    boardBarHeight: "58px",
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          //...
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.9rem",
            ".MuiOutlinedInput-notchedOutline ": {
              borderColor: theme.palette.primary.light,
            },
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline ": {
                borderColor: theme.palette.primary.main,
              },
            },
            "& fieldset": {
              // borderWidth: "2px !important",
            },
          };
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color: theme.palette.primary.main,
            fontSize: "0.9rem",
          };
        },
      },
    },
  },
});

export default theme;
