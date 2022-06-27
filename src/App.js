import { React, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import About from './page/About'
import NotFound from './page/NotFound'
import OrderTotals from './page/OrderTotals'
import LoginPass from './components/LoginPass'
import Order from './components/Order'
import BookDesc from './components/BookDesc'
import UserOrder from './components/UserOrder'
import OrderReady from './components/OrderReady'
import UserInfoContext from './context/UserInfoContext'
import OrderInfoContext from './context/OrderInfoContext'

function App() {
	const [user, setUser] = useState({
		email: null,
		phone: null,
		name: null,
	});

	const [order, setOrder] = useState([]);

	return (
		<UserInfoContext.Provider value={{user, setUser}}>
			<OrderInfoContext.Provider value={{order, setOrder}}>
				<div className="App">
					<Routes>
						<Route path="/" element={<LoginPass />} />
						<Route path="/order" element={<Order />}/>
						<Route path="/book" element={<BookDesc />}/>
						<Route path="/user_order" element={<UserOrder />}/>
						<Route path="/order_receipt" element={<OrderReady />}/>
						<Route path="/about" element={<About />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</div>
			</OrderInfoContext.Provider>
		</UserInfoContext.Provider>
	)
}

export default App