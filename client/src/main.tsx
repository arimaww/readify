import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { Auth } from './features/auth/auth.tsx'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Auth>
        <BrowserRouter>
          <SnackbarProvider autoHideDuration={2000}>
            <App />
          </SnackbarProvider>
        </BrowserRouter>
      </Auth>
    </Provider>

  </React.StrictMode>,
)
