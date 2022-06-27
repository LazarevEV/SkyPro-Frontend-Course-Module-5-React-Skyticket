import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../css/OrderDetail.css'

export default function OrderDetail(props) {
    return (
        <div className="order-detail">
            <h1 className="card-header">{props.productName}</h1>
            <p className="p-text">Price: {props.price}</p>
            <p className="p-text">Quantity: {props.quantity}</p>
            <Link className="read-more-link"
                to={"/book"}
                state={{
                    bookId: props.id
                }}
            >Read more</Link>
            <div className="control-block">
                {/* <button className="order-detail-button quantity-increase" type="button" onClick={() => {alert('Increased')}}>+</button> */}
                <button className="order-detail-button quantity-increase" type="button" onClick={(e) => {props.incrementFunction(props.id, e)}}>+</button>
                <button className="order-detail-button quantity-decrease" type="button" onClick={(e) => {props.decrementFunction(props.id, e)}}>-</button>
            </div>
        </div>
    )
}

OrderDetail.propTypes = {
    productName: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    id: PropTypes.number,
    incrementFunction: PropTypes.func,
    decrementFunction: PropTypes.func,
}