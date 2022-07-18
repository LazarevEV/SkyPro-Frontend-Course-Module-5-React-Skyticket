import { React, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import UserInfoContext from './context/UserInfoContext'

function App() {
	const [user, setUser] = useState({
		email: null,
		phone: null,
		name: null,
	});

	const [order, setOrder] = useState([]);

	return (
		<UserInfoContext.Provider value={{user, setUser}}>
			<div className="App">
				<Routes>

				</Routes>
			</div>
		</UserInfoContext.Provider>
	)
}

export default App