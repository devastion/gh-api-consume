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
import SearchInput from "./components/SearchInput";
import SkeletonBody from "./components/SkeletonBody";

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
        p: 1,
      }}
    >
      <IconButton
        sx={{ ml: 1, alignSelf: "flex-start" }}
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

  const validateLocalStoragePalette = (): "dark" | "light" => {
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
        <Container>
          <App />
          <SearchInput />
          <SkeletonBody />
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
