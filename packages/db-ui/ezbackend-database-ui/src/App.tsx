import Layout from "./Components/Layout";
import { useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, Roboto Mono, monospace',
  }
});

function App() {

  const [open, setOpen] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Layout
        open={open}
        handleClose={() => { setOpen(false) }}
        handleOpen={() => { setOpen(true) }}
      />
    </ThemeProvider>
  );
}

export default App;
