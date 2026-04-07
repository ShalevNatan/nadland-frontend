import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Amplify } from 'aws-amplify'
import './index.css'
import App from './App.jsx'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_RVkBkhAqN',
      userPoolClientId: 's6rglsg21ds85ahb9lhcoiac0',
      region: 'us-east-1',
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
