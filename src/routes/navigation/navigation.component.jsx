import './navigation.styles.scss'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'

import { useContext } from 'react'
import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

export default function Navigation() {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const { isCartOpen } = useContext(CartContext)

    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to={'/'}>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <strong>{currentUser?.displayName}</strong>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    {currentUser ? (
                        <span className='nav-link' onClick={signOutUser}>
                            LOGOUT
                        </span>
                    ) : (
                        <Link className='nav-link' to='/authentication'>
                            SIGN IN
                        </Link>
                    )}
                    <CartIcon />

                    {isCartOpen && <CartDropdown />}
                </div>
            </div>
            <Outlet />
        </>
    )
}
