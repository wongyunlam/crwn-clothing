import { createContext, useState, useEffect } from 'react'
import { addCollectionAndDocuments } from '../utils/firebase/firebase.upload'
import SHOP_DATA from '../shop-data'

const ProductContext = createContext({
    products: [],
    setProducts: () => {},
})

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const value = { products, setProducts }

    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    )
}

export { ProductContext, ProductProvider }
