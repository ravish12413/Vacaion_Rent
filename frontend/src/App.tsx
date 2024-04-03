import { FC } from 'react'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import Router from './pages/Router'
import { ThemeProvider } from './components/theme-provider'

const App: FC = () => {

  return (
    <BrowserRouter>
      <RecoilRoot>
        <ThemeProvider defaultTheme={"light"} storageKey='vite-ui-theme'>
          <Router />
        </ThemeProvider>
      </RecoilRoot>
    </BrowserRouter>
  )
}

export default App
