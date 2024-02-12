import axios from "axios";
import {setUser} from "../reducers/userReducer.ts";
import {Dispatch} from "redux";
import {checkErrors} from "./checkErrors.ts";


export const registration = async (email: string, password: string) => {
   try {
       const response = await axios.post('http://localhost:5001/api/auth/registration', {
           email,
           password
       })
       alert(response.data.message)
   }catch (error){
       checkErrors(error)
   }
}

export interface UserType {
    diskSpace: number
    email: string
    id: string
    usedSpace:number
}

interface LoginType {
    token: string
    user: UserType
}

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.post<LoginType>('http://localhost:5001/api/auth/login', {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        }catch (error){
            let errorMessage = "Произошла ошибка";
            if (axios.isAxiosError(error)) {
                errorMessage = error?.response?.data.message;
            }
            alert(errorMessage)
        }
    }
}

export const auth = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get<LoginType>('http://localhost:5001/api/auth/auth', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        }catch (error){
            let errorMessage = "Произошла ошибка";
            if (axios.isAxiosError(error)) {
                errorMessage = error?.response?.data.message;
            }
            localStorage.removeItem('token')
            console.log(errorMessage)
        }
    }
}
