import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CssBaseline from "@mui/material/CssBaseline"; // Nhất quán CSS trên các trình duyệt CSS Baseline
// using theme :
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material"; // Global CSS Override : customize
import { ToastContainer } from "react-toastify"; // Toastify : Hiển thị thông báo
const inputGlobalStyles = (
  <GlobalStyles
    styles={(theme) => ({ h1: { color: theme.palette.primary.main } })}
  />
);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {inputGlobalStyles}
      <App />
      <ToastContainer position="top-center"/>
    </ThemeProvider>
  </StrictMode>,
);
