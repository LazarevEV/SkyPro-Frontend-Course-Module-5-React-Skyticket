import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div>
            <h1>Page not found</h1>
            <p>ERROR 404</p>
            <Link to="/">Home</Link>
        </div>
    )
}
export default NotFound