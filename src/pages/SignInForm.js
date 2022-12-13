import React, { useState } from "react";
import '../App.css'
function SignInForm({ handleSignInClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleChange = (event) => {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailId: email, password: password })
        };
        fetch('http://3.15.205.237:4000/api/v1/user/signIn', requestOptions)
            .then(response => response.json())
            .then((data) => {
                setEmail('')
                setPassword('')
                getCartItems(data.data.accessToken)
            })
    }

    const getCartItems = async (accessToken) => {
        const response = await fetch('http://3.15.205.237:4000/api/v1/cart/view', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': accessToken
            }
        }).then(response => response.json())
        .then((data) => {
            data.data.accessToken = accessToken
            handleSignInClose(data.data)
        });
    }


    return (
        <>
            <div className="formCenter">
                <form onSubmit={handleSubmit} className="formFields">
                    <div>
                        <label className="formFieldLabel" htmlFor="email">
                            E-Mail Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="formFieldInput"
                            placeholder="Enter your email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="formFieldLabel" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="formFieldInput"
                            placeholder="Enter your password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <button className="formFieldButton">Sign In</button>{" "}
                        {/* <Link to="/" className="formFieldLink">
                        Create an account
                    </Link> */}
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignInForm;
