import { useContext } from 'react'

import { ProductContext } from '../../context/product.context'
import ProductCard from '../../components/product-card-component/product-card-component'

import './shop.styles.scss'

export default function Shop() {
    const { products } = useContext(ProductContext)

    return (
        <div className='products-container'>
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
