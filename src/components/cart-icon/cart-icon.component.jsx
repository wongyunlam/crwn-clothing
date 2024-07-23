import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'

import { useContext } from 'react'

import { CartContext } from '../../context/cart.context'

import './cart-icon.styles.scss'

export default function CartIcon() {
    const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext)
    const toggleCartOpen = () => {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{cartCount}</span>
        </div>
    )
}
