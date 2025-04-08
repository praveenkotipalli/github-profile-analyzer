import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div  style={{
  backgroundColor: "#eee9df",
  position: "fixed",  // or "absolute" if you prefer
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100vw",     // viewport width
  height: "100vh",    // viewport height
  overflow: "auto"}}>
    <App />
    </div>
    
  </StrictMode>,
)
