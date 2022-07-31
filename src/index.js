import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ModalComponent from 'react-modal-dom';
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { loginRecuder } from './redux/loginReducer';
import App from './App'
import reportWebVitals from './reportWebVitals'

const rootReducer = combineReducers({
	'login': loginRecuder,
})
const store = createStore(rootReducer)
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
	<Provider store={store}>
			<BrowserRouter>
			<ModalComponent />
			<App />
		</BrowserRouter>
	</Provider>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()