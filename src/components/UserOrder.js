import React, { useState, useRef, useContext } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UserInfoContext from '../context/UserInfoContext'

import goBackIcon from '../assets/icons/arrow_back.png'

const GoBackButton = styled.button`
    width: 24px;
    height: 24px;

    background: none;
    border: none;

    margin: 0;
    padding: 0;

    &:hover {
        cursor: pointer;
    }
`

const GoBackImg = styled.img`
    width: 16px;
    height: 16px;

    margin: 0;
    padding: 0;
`

const CardContent = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 92px 48px 48px 48px 92px;
    gap: 12px;
    justify-items: center;
    align-items: center;
`

const BoldText = styled.p`
    font-weight: 700;
    font-size: 24px;
`

const UserInput = styled.input`
    width: 256px;
    align-self: center;
`

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
`

const ControlBlock = styled.div`
    display: flex;
    justify-content: center;
    gap: 16px;
`

const BackToCart = styled.button`
    width: 96px;
    height: 32px;

    border-radius: 8px;
    border: none;
    background-color: #e4e4e4;

    &:hover {
        cursor: pointer;
        background-color: #c4c4c4;
    }
`

const SaveOrder = styled.button`
    width: 96px;
    height: 32px;

    border-radius: 8px;
    border: none;
    background-color: #48bf53;

    &:hover {
        cursor: pointer;
        background-color: #11823b;
    }
`

export default function BookDesc() {
    const {user, setUser} = useContext(UserInfoContext);
    const emailInputRef = useRef(null)
    const phoneInputRef = useRef(null)
    const nameInputRef = useRef(null)

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const handleOrder = () => {
        setUser({
            ...user,
            phone: phoneInputRef.current.value,
            name: nameInputRef.current.value,
        })
        navigate('/order_receipt')
    }

    return (
        <div className="order-detail user-order">
            <GoBackButton onClick={goBack}><GoBackImg src={goBackIcon} /></GoBackButton>
            <CardContent>
                <BoldText>INPUT DATA</BoldText>
                <InputBlock>
                    <label>Email: </label>
                    <UserInput ref={emailInputRef} type="email" value={user.email}></UserInput>
                </InputBlock>
                <InputBlock>
                    <label>Phone: </label>
                    <UserInput ref={phoneInputRef} type="tel"></UserInput>
                </InputBlock>
                <InputBlock>
                    <label>Name: </label>
                    <UserInput ref={nameInputRef} type="text"></UserInput>
                </InputBlock>
                <ControlBlock>
                    <BackToCart onClick={goBack}>Back to cart</BackToCart>
                    <SaveOrder onClick={handleOrder}>Order</SaveOrder>
                </ControlBlock>
            </CardContent>
        </div>
    )
}