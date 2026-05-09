import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Gestor from './components/gestor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gestor />
  </StrictMode>,
)
