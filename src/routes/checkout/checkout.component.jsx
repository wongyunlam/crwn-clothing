import { useContext } from 'react'

import { CartContext } from '../../context/cart.context'

export default function Checkout() {
    const {
        cartItems,
        addItemToCart,
        removeItemFromCart,
        removeAllItemFromCart,
    } = useContext(CartContext)

    return (
        <div className='checkout-container'>
            {cartItems.map(item => (
                <div key={item.id}>
                    <img src={item.imageUrl} alt={item.name} />
                    {item.name}
                    <button onClick={() => addItemToCart(item)}>+</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => removeItemFromCart(item)}>-</button>
                    <span>{item.quantity * item.price}</span>
                    <span onClick={() => removeAllItemFromCart(item)}>X</span>
                </div>
            ))}
        </div>
    )
}
