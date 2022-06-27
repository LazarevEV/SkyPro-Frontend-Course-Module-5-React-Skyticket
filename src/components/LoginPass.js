import React, { useState, useRef, useContext } from 'react'
import useInputRequired from '../hooks/useInputRequired'
import UserInfoContext from '../context/UserInfoContext'
import { Link, useNavigate, useParams } from 'react-router-dom'

const IS_LOGIN_REQUIRED = true;
const IS_PASSWORD_REQUIRED = true;

const ERROR_MESSAGES = {
    emptyField: "This field is required!",
    loginInvalid: "Login is invalid! Expected smth like example@example.com",
    passInvalid: "Password is invalid! Length should be at least 6 characters."
}

export default function LoginPassHW10() {
    const [creds, inputChangeHandler, onBlurHandler, inputState, setInputState] = useInputRequired({});
    const {user, setUser} = useContext(UserInfoContext)
    const navigate = useNavigate();

    const loginInputRef = useRef(null);
    const passInputRef = useRef(null);
    const loginInputError = useRef(null);
    const passInputError = useRef(null);

    const validateCreds = () => {
        let count = 0;
        count += (IS_PASSWORD_REQUIRED) ? setError("password", passInputRef, passInputError) : 0
        count += (IS_LOGIN_REQUIRED) ? setError("login", loginInputRef, loginInputError) : 0

        // if (count === 0) navigate('/cart', {replace: true})
        if (count === 0) {
            setUser({
                ...user,
                email: creds.login
            })
            navigate('/order', {replace: true})
        }
    }

    const validateLogin = () => {
        if (!creds.login) return "emptyField"
        return (/\S+@\S+\.\S+/.test((creds.login || ""))) ? "loginValid" : "loginInvalid";
    }

    const validatePassword = () => {
        if (!creds.password) return "emptyField"
        return ((creds.password  || '').length >= 6) ? "passValid" : "passInvalid";
    }

    const setError = (className, inputRef, errorRef) => {
        setInputState(inputState => ({...inputState, [inputRef.current.name]: (validationResultBool) ? 1 : 0}));
        // alert(inputState.login + " " + inputState.password)

        const validationResult = (className === "login") ? validateLogin() : validatePassword()
        const validationResultBool = (className === "login") ? validationResult === "loginValid" : validationResult === "passValid"

        if (!validationResultBool) {
            // alert(0)
            inputRef.current.classList.add("error")
            inputRef.current.focus()
            errorRef.current.textContent = ERROR_MESSAGES[validationResult]
        } else {
            // alert(1)
            inputRef.current.classList.remove("error")
        }

        return (validationResultBool) ? 0 : 1;
    }

    return (
        <div className="cred-wrapper">
            <label htmlFor="login-input">Login:</label>
            <input ref={loginInputRef} id="login-input" name="login" className="login" onChange={inputChangeHandler} onBlur={(event) => onBlurHandler(event, IS_LOGIN_REQUIRED, validateLogin() === "loginValid")}></input>
            <span ref={loginInputError} className="error-message login">This field is required!</span>
            <label htmlFor="pass-input">Password:</label>
            <input ref={passInputRef} id="pass-input" name="password" className="password" onChange={inputChangeHandler} onBlur={(event) => onBlurHandler(event, IS_PASSWORD_REQUIRED, validatePassword() === "passValid")}></input>
            <span ref={passInputError} className="error-message password">This field is required!</span>
            <button type="submit" className="button" onClick={validateCreds}>LOG IN</button>
        </div>
    )
}