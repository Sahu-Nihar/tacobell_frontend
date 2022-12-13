import React, { useState } from 'react'
import { Button } from '@mui/material'
import SignInForm from './pages/SignInForm'
import SignUpForm from './pages/SignUpForm'
import Cart from './pages/Cart'

export function Main() {
    const [openSignin, setOpenSignin] = useState(false)
    const [openSignup, setOpenSignup] = useState(true)
    const [openCart, setOpenCart] = useState(false)
    const [cartData, setCartData] = useState()
    const handleSignin = () => {
        setOpenSignin(true)
        setOpenSignup(false)
        setOpenCart(false)
    }
    const handleSignup = () => {
        setOpenSignin(false)
        setOpenSignup(true)
        setOpenCart(false)
    }
    // const handleCart = () => {
    //     setOpenSignin(false)
    //     setOpenSignup(false)
    //     setOpenCart(true)
    // }

    const handleSignInClose = (cartData) => {
        setOpenSignin(false)
        setOpenSignup(false)
        setOpenCart(true)
        setCartData(cartData)
    }

    const handleSignUpClose = (cartData) => {
        setOpenSignup(false)
        setOpenSignin(true)
    }

    return (
        <div>
            <Button onClick={handleSignin}>Sign In</Button>
            <Button onClick={handleSignup}>Sign Up</Button>
            {openSignin && <SignInForm handleSignInClose={handleSignInClose} />}
            {openSignup && <SignUpForm handleSignUpClose={handleSignUpClose} />}
            {openCart && cartData && <Cart cartData={cartData} />}
        </div>
    )
}
