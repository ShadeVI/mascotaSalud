import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { PetsProvider } from './contexts/PetsContext.jsx'
import { ExpensesProvider } from './contexts/ExpensesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PetsProvider>
        <ExpensesProvider>
          <App />
        </ExpensesProvider>
      </PetsProvider>
    </AuthProvider>
  </React.StrictMode>
)
