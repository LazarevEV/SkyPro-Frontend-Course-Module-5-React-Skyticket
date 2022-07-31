import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { modal } from 'react-modal-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import Skeleton from '@mui/material/Skeleton';
import CheckoutModal from '../components/CheckoutModal'

const ModalWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const ModalWrapperInner = styled.div`
    width: 384px;
    height: 358px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;

    background-color: #FFFFFF;
    border-radius: 32px;
    box-shadow: 0px 0px 16px 8px rgba(0, 0, 0, .5);

    margin: 32px;
    padding: 24px;
    padding-top: 46px;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    // gap: 24px;

    padding-left: calc(50% - 720px);
	padding-right: calc(50% - 720px);
`

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;

    padding: 0px;
    margin-left: ${props => props.marginLeft};
`

const FormLabel = styled.span`
    display: inline-block;
    width: ${props => props.width};

    text-align: center;
    // background-color: #F6F6F2;
    background-color: #FFFFFF;

    position: relative;
    top: 8px;
    left: 12px;
`

const InputStyled = styled.input`
    height: 38px;
    width: 256px;

    font-size: 16px;
    font-family: Roboto;
    text-align: left;

    // background-color: #F6F6F2;
    background-color: #FFFFFF;
    border: 1px solid black;
    border-radius: 8px;

    padding-left: 8px;
    padding-right: 8px;
`

const LoginButton = styled.button`
    width: 128px;
    height: 42px;

    font-size: 18px;
    font-weight: 600;

    background-color: #fae333;
    border: none;
    border-radius: 32px;

    &:hover {
        cursor: pointer;
        background-color: #ebd005;
    }

    margin-top: 12px;
`

const ErrorText = styled.span`
    height: 22px;

    font-size: 16px;
    font-weight: 400;
    color: #ff7376;
`

const ERROR_MESSAGES = {
    emptyField: "This field is required!",
    loginInvalid: "Login is invalid! Expected smth like example@example.com",
    passInvalid: "Password is invalid! Length should be at least 6 characters.",
    fieldValid: "",
}

function LoginPassModal(props) {
    const [creds, setCreds] = useState({name: null, login: null, password: null})
    const [errorTexts, setErrorTexts] = useState(["", "", ""])

    const navigate = useNavigate();


    const nameInputRef = useRef(null);
    const loginInputRef = useRef(null);
    const passInputRef = useRef(null);
    const nameInputError = useRef(null);
    const loginInputError = useRef(null);
    const passInputError = useRef(null);

    const validateLogin = () => {
        if (!creds.login) return "emptyField"
        return (/\S+@\S+\.\S+/.test((creds.login || ""))) ? "fieldValid" : "loginInvalid";
    }

    const validatePassword = () => {
        if (!creds.password) return "emptyField"
        return ((creds.password  || '').length >= 6) ? "fieldValid" : "passInvalid";
    }

    const validateName = () => {
        if (!creds.name) return "emptyField"
        return "fieldValid"
    }

    function validateCreds() {
        const refs = [nameInputError, loginInputError, passInputError]
        const validationResults = [validateName(), validateLogin(), validatePassword()]

        setErrorTexts(validationResults.map(valRes => ERROR_MESSAGES[valRes]))
        return validationResults.map(valRes => valRes !== 'fieldValid').reduce((x, y) => x + y, 0)
    }

    const handleLogin = () => {
        console.log('> Logging in...')
        if (validateCreds() === 0) {
            props.onLoginSubmit(creds)
            // navigate('/events', {replace: true})
            modal.close()
            if (props.additionalProps?.navToCheckout || false) {
                modal.open(<CheckoutModal eventInfo={props.additionalProps.eventInfo} ticketAmount={props.additionalProps.ticketAmount} />)
            }
        } else {
            console.log('Something is wrong...')
        }
    }

    const inputChangeHandler = (event) => {
        setCreds({...creds, [event.target.name]: event.target.value});
    }
    
    return (
        <ModalWrapper>
            <ModalWrapperInner>
                <InputWrapper>
                    <FormWrapper>
                        <FormLabel width="38px">Имя</FormLabel>
                        <InputStyled ref={nameInputRef} name="name" onChange={inputChangeHandler}></InputStyled>
                    </FormWrapper>
                    <ErrorText ref={nameInputError}>{errorTexts[0]}</ErrorText>
                    <FormWrapper>
                        <FormLabel width="52px">Логин</FormLabel>
                        <InputStyled ref={loginInputRef} name="login" onChange={inputChangeHandler}></InputStyled>
                    </FormWrapper>
                    <ErrorText ref={loginInputError}>{errorTexts[1]}</ErrorText>
                    <FormWrapper>
                        <FormLabel width="62px">Пароль</FormLabel>
                        <InputStyled ref={passInputRef} name="password" onChange={inputChangeHandler} type="password"></InputStyled>
                    </FormWrapper>
                    <ErrorText ref={passInputError}>{errorTexts[2]}</ErrorText>
                </InputWrapper>
                <LoginButton type="submit" onClick={handleLogin}>LOG IN</LoginButton>
            </ModalWrapperInner>
        </ModalWrapper>
    )
}

function mapDispatchToProps(dispatch) {
	return {
		onLoginSubmit: (creds) => {
			const action = { type: 'LOG IN', status: true, name: creds.name, email: creds.login }
			dispatch(action)
		},
	}
}

export default connect(null, mapDispatchToProps)(LoginPassModal)

LoginPassModal.propTypes  = {
    onLoginSubmit: PropTypes.func,
    additionalProps: PropTypes.object,
}