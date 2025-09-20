import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ChecklistApp from './ChecklistApp.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChecklistApp />
        <App />
  </StrictMode>,
)
