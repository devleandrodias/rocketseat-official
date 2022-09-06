import { ThemeProvider } from "styled-components";
import { Transctions } from "./pages/Transactions";

import { GlobalStyle } from "./styles/global";
import { defaultTheme } from "./styles/themes/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Transctions />
    </ThemeProvider>
  );
}
