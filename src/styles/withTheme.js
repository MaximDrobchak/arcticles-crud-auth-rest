import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";

/**Main theme Context */
const theme = createMuiTheme({
  palette: {
    primary: { main: "#2962FF" },
    secondary: { main: "#f50057" }
  },
  typography: {
    useNextVariants: true
  }
});

function withTheme(Component) {
  function WithTheme(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithTheme;
}

export default withTheme;
