import './checkout-item.styles.scss'
import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'

export default function CheckoutItem({ cartItem }) {
    const { addItemToCart, removeItemFromCart, clearItemFromCart } =
        useContext(CartContext)

    const addItemHandler = () => addItemToCart(cartItem)

    const removeItemHandler = () => removeItemFromCart(cartItem)

    const clearItemHandler = () => clearItemFromCart(cartItem)

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={cartItem.imageUrl} alt={cartItem.name} />
            </div>
            <div className='name'>{cartItem.name}</div>
            <span className='quantity'>
                <span className='arrow' onClick={addItemHandler}>
                    &#10094;
                </span>
                <span className='value'>{cartItem.quantity}</span>
                <span className='arrow' onClick={removeItemHandler}>
                    &#10095;
                </span>
            </span>
            <span className='price'>{cartItem.quantity * cartItem.price}</span>
            <span className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </span>
        </div>
    )
}
