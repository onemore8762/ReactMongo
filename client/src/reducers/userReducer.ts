import {UserType} from "../actions/user.ts";



const defaultState = {
    currentUser: {},
    isAuth: false
}

export default function userReducer(state = defaultState, action: UserActionsType) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }
        case "LOGOUT":
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {},
                isAuth: false
            }
        default:
            return state
    }
}


export const setUser = (user: UserType) => ({type: "SET_USER", payload: user} as const)
export const logout = () => ({type: "LOGOUT"} as const)

export type UserActionsType = ReturnType<typeof setUser> | ReturnType<typeof logout>
