/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import OrderInfoContext from '../context/OrderInfoContext'
import OrderDetail from './OrderDetail'
import '../css/Order.css'

const SaveOrder = styled(Link)`
    width: 96px;
    height: 32px;

    border-radius: 8px;
    border: none;
    background-color: #48bf53;
    font-size: 18px;
    color: #000000;
    text-decoration: none;
    text-align: center;

    margin-top: 12px;

    &:hover {
        cursor: pointer;
        background-color: #11823b;
    }

    &:visited {
        color: #000000;
    }
`

export default class Order extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            amount: 0,
            quantity: 0,
            details: [
                {
                    id: 1,
                    productName: 'Война и мир - Л.Н.Толстой',
                    price: 800,
                    quantity: 0,
                },
                {
                    id: 2,
                    productName: 'Две жизни - К.Е.Антарова',
                    price: 700,
                    quantity: 0,
                },
                {
                    id: 3,
                    productName: 'Разговор с богом - Н.Д.Уолша',
                    price: 1000,
                    quantity: 0,
                },
                {
                    id: 4,
                    productName: 'Хохот Шамана - В.П.Серкин',
                    price: 600,
                    quantity: 0,
                },
                {
                    id: 5,
                    productName: 'Хроники Ехо - Макс Фрай',
                    price: 400,
                    quantity: 0,
                },
            ],
        }
    }

    static contextType = OrderInfoContext;

    increaseUnitQuantityAndPrice = (unitId) => {
        let stateDetails = Object.values({...this.state.details});
        stateDetails.forEach((unit) => {
            if (unit.id === unitId) {
                unit.quantity += 1;
                this.setState({amount: this.state.amount + unit.price, quantity: this.state.quantity + 1})
            }
        });

        this.setState({details: stateDetails});
    }

    decreaseUnitQuantityAndPrice = (unitId) => {
        let stateDetails = Object.values({...this.state.details});
        stateDetails.forEach((unit) => {
            if ( (unit.id === unitId) && (unit.quantity !== 0) ) {
                unit.quantity -= 1;
                this.setState({amount: this.state.amount - unit.price, quantity: this.state.quantity - 1})
            }
        });

        this.setState({details: stateDetails});
    }

    saveOrder = () => {
        console.log('saveOrder')
        console.log(this.state.details.filter(book => book.quantity !== 0))
        this.context.setOrder(this.state.details.filter(book => book.quantity !== 0))
    }

    render() {
        console.log(this.context)
        const orderList = this.state.details.map((order) => 
            <OrderDetail
                key={order.id}
                id={order.id}
                productName={order.productName}
                price={order.price}
                quantity={order.quantity}
                incrementFunction={this.increaseUnitQuantityAndPrice}
                decrementFunction={this.decreaseUnitQuantityAndPrice}
            />
        );

        return (
            <div className="order">
                <div className="card-wrapper">
                    {orderList}
                </div>
                <div className="total-info-wrapper">
                    <p className="total">
                        Total Quantity : <b>{this.state.quantity}</b>
                    </p>
                    <p className="total">
                        Total Price : <b>{this.state.amount}</b>
                    </p>
                    <SaveOrder to={"/user_order"} onClick={this.saveOrder}>Order</SaveOrder>
                </div>
            </div>
        )
    }
}