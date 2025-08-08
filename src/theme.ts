import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h4: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#000000",
    },
    h6: {
      fontSize: "16px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
      color: "#666666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "14px",
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#333",
          },
        },
        outlined: {
          borderColor: "#e0e0e0",
          color: "#000",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#e0e0e0",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          "&:hover": {
            borderColor: "#000000",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(37, 99, 235, 0.08)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 600px)": {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
  },
});
