import React, { useState } from 'react'
import UserForm from './pages/UserForm'
import Cart from './pages/Cart'

export function Main() {
    const [openUserForm, setOpenUserForm] = useState(true)
    const [openCart, setOpenCart] = useState(false)
    const [cartData, setCartData] = useState()

    const handleSignInClose = (cartData) => {
        setOpenUserForm(false)
        setOpenCart(true)
        setCartData(cartData)
    }

    return (
        <div>
            {openUserForm && <UserForm handleSignInClose={handleSignInClose} />}
            {openCart && cartData && <Cart cartData={cartData} />}
        </div>
    )
}
