import './navigation.styles.scss'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import CartIcon from '../../components/cart-icon/cart-icon.component'

import { useContext } from 'react'
import { UserContext } from '../../context/user.context'

import { signOutUser } from '../../utils/firebase/firebase.utils'

export default function Navigation() {
    const { currentUser, setCurrentUser } = useContext(UserContext)

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
                </div>
            </div>
            <Outlet />
        </>
    )
}
