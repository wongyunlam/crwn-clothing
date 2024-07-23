import { createContext, useState } from 'react'

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === productToAdd.id
    )

    // if found, increment quantity
    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    // if not, return new array with modified cartItems/ new cart cartItems
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const quantity = cartItemToRemove.quantity

    if (quantity === 1) {
        return cartItems.filter(item => item.id !== cartItemToRemove.id)
    }

    return cartItems.map(item =>
        item.id === cartItemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    )
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(item => item.id !== cartItemToClear.id)
}

const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},

    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},

    cartCount: 0,
    cartTotal: 0,
})

const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const [cartItems, setCartItems] = useState([])

    const addItemToCart = product =>
        setCartItems(addCartItem(cartItems, product))

    const removeItemFromCart = cartItem =>
        setCartItems(removeCartItem(cartItems, cartItem))

    const clearItemFromCart = cartItem =>
        setCartItems(clearCartItem(cartItems, cartItem))

    const cartCount = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
    )

    const cartTotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
    )

    const value = {
        isCartOpen,
        setIsCartOpen,

        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,

        cartCount,
        cartTotal,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export { CartContext, CartProvider }
