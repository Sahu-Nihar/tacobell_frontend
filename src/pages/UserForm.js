import React, { useState } from "react";
import '../App.css'
function UserForm({ handleSignInClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [checkBox, setCheckBox] = useState(false);

    const [signUpSuccess, setSignUpSuccess] = useState(false);

    const handleChange = (event) => {
        let target = event.target;
        let value = target.value;
        let name = target.name;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'name') {
            setName(value)
        }
    }
    const handleSignInClick= (event) => {
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailId: email, password: password })
        };
        fetch('http://18.225.10.147:4000/api/v1/user/signIn', requestOptions)
            .then(response => response.json())
            .then((data) => {
                setEmail('')
                setPassword('')
                getCartItems(data.data.userId)
            })
    }

    const handleSignUpClick = (event) => {
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
                setCheckBox(false);
                setSignUpSuccess(true);
            })
    }

    const getCartItems = async (userId) => {
        const response = await fetch(`https://v142vfs394.execute-api.us-east-2.amazonaws.com/dev/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then((data) => {
                data.userId = userId
                handleSignInClose(data)
            });
    }

    const handleCheck = () => {
        setCheckBox(!checkBox);
    }

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row full-height justify-content-center">
                        <div className="col-12 text-center align-self-center py-5">
                            <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 className="mb-0 pb-3" style={{ textAlign: 'center' }}><span>Log In </span><span>Sign Up</span></h6>
                                <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" checked={checkBox} onClick={handleCheck}/>
                                <label for="reg-log"></label>
                                <div className="card-3d-wrap mx-auto">
                                    <div className="card-3d-wrapper">
                                        <div className="card-front">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    {
                                                        signUpSuccess && (<p className="signUpSuccess">Sign up is successful, please login.</p>)
                                                    }
                                                    <h4 className="mb-4 pb-3" style={{ textAlign: 'center', width: '84%' }}>Log In</h4>
                                                    <div className="form-group">
                                                        <input type="email" value={email} name="email" className="form-style" placeholder="Your Email" id="logemail" onChange={handleChange} />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="password" value={password} className="form-style" placeholder="Your Password" id="logpass" onChange={handleChange} />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <a href="#" className="btn mt-4" onClick={handleSignInClick}>submit</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-back">
                                            <div className="center-wrap">
                                                <div className="section text-center">
                                                    <h4 className="mb-4 pb-3" style={{ textAlign: 'center', width: '84%' }}>Sign Up</h4>
                                                    <div className="form-group">
                                                        <input type="text" name="name" value={name} className="form-style" placeholder="Your Full Name" id="logname" onChange={handleChange} />
                                                        <i className="input-icon uil uil-user"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="email" name="email" value={email} className="form-style" placeholder="Your Email" id="logemail" onChange={handleChange} />
                                                        <i className="input-icon uil uil-at"></i>
                                                    </div>
                                                    <div className="form-group mt-2">
                                                        <input type="password" name="password" value={password} className="form-style" placeholder="Your Password" id="logpass" onChange={handleChange} />
                                                        <i className="input-icon uil uil-lock-alt"></i>
                                                    </div>
                                                    <a href="#" className="btn mt-4" onClick={handleSignUpClick}>submit</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserForm;
// email: abc1@gmail.com, password: password