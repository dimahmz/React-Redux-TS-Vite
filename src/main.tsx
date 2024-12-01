import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider } from "react-redux"
import { store } from "@/store"
import AppRouterProvider from '@/routes'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <AppRouterProvider />
      </StyledEngineProvider>
    </Provider>
  </StrictMode>,
)
