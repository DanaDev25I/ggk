import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import  './index.css'
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { StateContextProvider } from './store/usecontext';
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
      <StateContextProvider>
        <App />
      </StateContextProvider>
      </NextThemesProvider>
    </NextUIProvider>
  </StrictMode>,
)

