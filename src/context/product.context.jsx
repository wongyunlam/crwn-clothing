import { createContext, useState } from 'react'

import PRODUCTS from '../shop-data.json'

const ProductContext = createContext({
    products: [],
    setProducts: () => {},
})

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS)
    const value = { products, setProducts }

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }
