import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AdminProvider } from './context/AdminContext.jsx'
import { ShopProvider } from './context/ShopContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <ShopProvider>
          <CartProvider>
            <OrderProvider>
              <NotificationProvider>
                <App />
              </NotificationProvider>
            </OrderProvider>
          </CartProvider>
        </ShopProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>,
)
