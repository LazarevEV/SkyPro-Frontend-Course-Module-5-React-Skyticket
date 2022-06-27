import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function OrderTotals() {
    const location = useLocation();
    
    return (
        <div>
            <h1>Order Totals</h1>
            <div className="total">
                <h3>Total amount: {location.state.totalAmount}</h3>
                <h3>Total quantity: {location.state.totalQuantity}</h3>
            </div>
            <div className="nav">
                <Link to="/cart">Back to cart</Link>
                <Link to="/">Home</Link>
                <Link to="/about">About Shop</Link>
            </div>
        </div>
    )
}
export default OrderTotals