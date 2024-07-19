import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'

import { UserProvider } from './context/user.context'
import { ProductProvider } from './context/product.context'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <UserProvider>
            <ProductProvider>
                <App />
            </ProductProvider>
        </UserProvider>
    </BrowserRouter>
)
