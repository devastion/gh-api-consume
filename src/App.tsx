import React from "react";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useTheme,
  IconButton,
  Box,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import SearchInput from "./components/SearchInput";
import SkeletonBody from "./components/SkeletonBody";
import Profile from "./Profile";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function App() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        backgroundColor: "background.default",
        color: "text.primary",
        borderRadius: 1,
      }}
    >
      <IconButton
        sx={{ ml: 1, alignSelf: "flex-start", position: "fixed" }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
    </Box>
  );
}

export default function ToggleColorMode() {
  const getLocalStoragePalette = localStorage.getItem("theme") || "dark";

  const validateLocalStoragePalette = (): any => {
    if (getLocalStoragePalette != null) {
      if (getLocalStoragePalette === "dark" || "light") {
        return getLocalStoragePalette;
      }
    }
    return "dark";
  };

  const [mode, setMode] = React.useState<"light" | "dark">(
    validateLocalStoragePalette
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={{ py: 3 }}>
          <BrowserRouter>
            <App />
            <SearchInput />
            {useAppSelector((state) => state.profile.loading) != "success" ? (
              <SkeletonBody />
            ) : (
              <Profile />
            )}
          </BrowserRouter>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
