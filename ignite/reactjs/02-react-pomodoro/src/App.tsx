import { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/deafult'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <button>Enviar</button>
      <GlobalStyle />
    </ThemeProvider>
  )
}
