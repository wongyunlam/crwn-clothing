import { createContext, useState, useEffect, useReducer } from 'react'

import createAction from '../utils/reducer/reducer.utils'

// helper function
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === productToAdd.id
    )

    if (existingCartItem) {
        return cartItems.map(cartItem =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        )
    }

    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    )

    // check if quantity is equal to 1, if it is remove that item from the cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map(cartItem =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) =>
    cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
})

export const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

export function cartReducer(state, action) {
    const { type, payload } = action

    switch (type) {
        case ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        case ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }

        default:
            return state
    }
}

export const CartProvider = ({ children }) => {
    // const [isCartOpen, setIsCartOpen] = useState(false)
    // const [cartItems, setCartItems] = useState([])
    // const [cartCount, setCartCount] = useState(0)
    // const [cartTotal, setCartTotal] = useState(0)

    // useEffect(() => {
    //     const newCartCount = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity,
    //         0
    //     )
    //     setCartCount(newCartCount)
    // }, [cartItems])

    // useEffect(() => {
    //     const newCartTotal = cartItems.reduce(
    //         (total, cartItem) => total + cartItem.quantity * cartItem.price,
    //         0
    //     )
    //     setCartTotal(newCartTotal)
    // }, [cartItems])

    const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const { isCartOpen, cartItems, cartCount, cartTotal } = state

    const updateCartItemsReducer = newCartItems => {
        // generate newCartTotal
        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        )

        // generate newCartCount
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        )

        //
        // dispatch new action with payload = {
        //     newCartItems,
        //     newCartTotal,
        //     newCartCount
        // }
        dispatch(
            createAction(ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount,
            })
        )
    }

    const addItemToCart = productToAdd => {
        const newCartItem = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItem)
    }

    const removeItemToCart = cartItemToRemove => {
        const newCartItem = removeCartItem(cartItems, cartItemToRemove)
        updateCartItemsReducer(newCartItem)
    }

    const clearItemFromCart = cartItemToClear => {
        const newCartItem = clearCartItem(cartItems, cartItemToClear)
        updateCartItemsReducer(newCartItem)
    }

    const setIsCartOpen = bool => {
        dispatch(createAction(ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartItems,
        cartCount,
        cartTotal,
    }

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
