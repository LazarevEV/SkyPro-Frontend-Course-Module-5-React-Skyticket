import { React, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import './App.css'
import MainPage from './page/MainPage'
import UserInfoContext from './context/UserInfoContext'

function App() {
	const [user, setUser] = useState({
		email: null,
		phone: null,
		name: null,
	});

	return (
		<UserInfoContext.Provider value={{user, setUser}}>
			<div className="App">
				<Routes>
					<Route path="/" element={<MainPage />} />
				</Routes>
			</div>
		</UserInfoContext.Provider>
	)
}

export default App