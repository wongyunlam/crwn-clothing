import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { CartContext } from '../../context/cart.context'

import './cart-dropdown.styles.scss'
import Button from '../button/button.component'

import CartItem from '../cart-item/cart-item.component'

export default function CartDropdown() {
    const { cartItems, setIsCartOpen } = useContext(CartContext)
    const navigate = useNavigate()

    console.log('cartItems', cartItems)

    const navigateToCheckout = () => {
        setIsCartOpen(false)
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems?.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={navigateToCheckout}>GO TO CHECKOUT</Button>
        </div>
    )
}
