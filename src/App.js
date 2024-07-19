import { Routes, Route, Outlet } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'
import SignIn from './routes/authentication/authentication.component'
import Shop from './routes/shop/shop.component'

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Navigation />}>
                <Route index element={<Home />} />
                <Route path='shop' element={<Shop />} />
                <Route path='authentication' element={<SignIn />} />
            </Route>
        </Routes>
    )
}
