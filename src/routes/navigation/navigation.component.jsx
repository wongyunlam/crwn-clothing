import './navigation.styles.scss'
import { Link, Outlet } from 'react-router-dom'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

export default function Navigation() {
    return (
        <>
            <div className='navigation'>
                <Link className='logo-container' to={'/'}>
                    <CrwnLogo className='logo' />
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                    <Link className='nav-link' to='/authentication'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </>
    )
}
