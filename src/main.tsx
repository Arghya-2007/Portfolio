import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { StrictMode } from 'react'
import './styles/globals.css'
import App from './App.tsx'

export const createRoot = ViteReactSSG(
  <StrictMode>
    <App />
  </StrictMode>
)
