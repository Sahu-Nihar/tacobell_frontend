import React, { useState } from "react";
import '../App.css'
function SignUpForm({ handleSignUpClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleChange = (event) => {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'name') {
            setName(value)
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailId: email, password: password, name: name })
        };
        fetch('http://18.225.10.147:4000/api/v1/user/signUp', requestOptions)
            .then(response => response.json())
            .then((data) => {
                setEmail('')
                setPassword('')
                setName('')
                handleSignUpClose(data.data.accessToken)
            })
    }

    return (
        <>
            <div className="formCenter">
                <form onSubmit={handleSubmit} className="formFields">
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="formFieldInput"
                            placeholder="Enter your full name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formField">
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
                    <div className="formField">
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
                    <div className="formField">
                        <button className="formFieldButton">Sign Up</button>{" "}
                        {/* <Link to="/sign-in" className="formFieldLink">
                        I'm already member
                    </Link> */}
                    </div>
                </form>
            </div>
        </>
    );
}
export default SignUpForm;
