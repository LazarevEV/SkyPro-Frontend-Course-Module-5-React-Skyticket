import React, { useState, useRef, useContext } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import UserInfoContext from '../context/UserInfoContext'
import OrderInfoContext from '../context/OrderInfoContext'


import logo from '../assets/logo_placeholder.png'

const Logo = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 4px;
    align-items: center;

    border-bottom: 1px solid #d4d4d4;
    margin: 12px;
    margin-top: 0;
    padding-bottom: 12px;
`

const LogoImage = styled.img`
    width: 128px;
    height: 128px;
`

const BoldText = styled.p`
    font-size: 18px;
    font-weight: 700;

    margin: 0;
    padding: 0;
`

const Block = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;

    border-bottom: 1px solid #d4d4d4;
    padding-bottom: 12px;
`
export default function OrderReady() {
    const {user, setUser} = useContext(UserInfoContext)
    const {order, setOrder} = useContext(OrderInfoContext)

    const navigate = useNavigate()
    const goBack = () => {
        navigate(-1)
    }

    const getTotalAmount = () => {
        let totalAmount = 0
        order.forEach(book => totalAmount += book.quantity*book.price)

        return totalAmount
    }

    return (
        <div className="order-detail order-receipt">
            <Logo>
                <LogoImage src={logo}></LogoImage>
                <BoldText>COMPANY NAME</BoldText>
            </Logo>
            <Block>
                <BoldText>Contact Info:</BoldText>
                <span>Email: {user.email}</span>
                <span>Phone: {user.phone}</span>
                <span>Name: {user.name}</span>
            </Block>
            <Block>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: 200}}>Book</th>
                            <th style={{width: 106, textAlign: "center"}}>Quantity</th>
                            <th style={{width: 106, textAlign: "center"}}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((book) => {
                            return (
                                <tr key={book.id}>
                                    <td>{book.productName}</td>
                                    <td style={{textAlign: "center"}}>{book.quantity}</td>
                                    <td style={{textAlign: "center"}}>{book.quantity*book.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan="2">Total:</th>
                            <td style={{textAlign: "center"}}><b>{getTotalAmount()}</b></td>
                        </tr>
                    </tfoot>
                </table>
            </Block>
        </div>
    )
}