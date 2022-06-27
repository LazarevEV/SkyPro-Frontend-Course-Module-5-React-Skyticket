import React from 'react'
import { Link } from 'react-router-dom'

function About() {
    return (
        <div>
            <h1>About page here!</h1>
            <h3>Shop address</h3>
            <p>
                Twin Coconut Tree No.3, Moo2, Ban Tai, สุราษฎร์ธานี/ Surat Thani -
                เกาะพะงัน/ Ko Pha-ngan - 84280 (+66) 0948037278
            </p>
            <Link to="/">Home</Link>
        </div>
    )
}
export default About