import { LOGIN, LOGOUT } from './types'

const initialState = {
    status: false,
    name: "Name Placeholder",
    email: "placeholder@placeholder.com",
}

export const loginRecuder = (state = initialState, action) => {
    // console.log('reducer >', action)

    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                status: true,
                name: action.name,
                email: action.email,
            }
        case LOGOUT:
            return {
                ...state,
                status: false,
                name: action.name,
                email: action.email,
            }
        default:
            return state
    }
}