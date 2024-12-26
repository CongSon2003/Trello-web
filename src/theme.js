// import { cyan, deepOrange, orange, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
// Create a theme instance.
// resource : https://mui.com/material-ui/customization/default-theme/
const APP_BAR_HEIGHT = "55px";
const BOARD_BAR_HEIGHT = "58px";
const COLUMN_HEADER_HEIGHT = "58px";
const COLUMN_FOOTER_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${BOARD_BAR_HEIGHT} - ${APP_BAR_HEIGHT})`;
const theme = createTheme({
  Trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  colorSchemes: {
    light: {
      // palette: {
      //   primary: teal,
      //   secondary: deepOrange,
      // },
      // components: {
      //   MuiCssBaseline: {
      //     styleOverrides: ``, // This is global theme overrides
      //   },
      // },
      // // spacing: (factor) => `${0.25 * factor}rem`,
    },
    dark: {
      // palette: {
      //   primary: cyan,
      //   secondary: orange,
      // },
      // // spacing : (factor) => `${0.25 * factor}rem`
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdc3c7",
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
            {
              backgroundColor: "#959595",
            },
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
              // borderColor: theme.palette.primary.light,
            },
            "&:hover": {
              ".MuiOutlinedInput-notchedOutline ": {
                // borderColor: theme.palette.primary.main,
              },
            },
            "& fieldset": {
              borderWidth: "1px !important",
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
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.9rem",
          },
        },
      },
    },
  },
});

export default theme;
