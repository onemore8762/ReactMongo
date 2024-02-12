import axios from "axios";
import {checkErrors} from "./checkErrors.ts";
import {Dispatch} from "redux";
import {setFiles} from "@/reducers/fileReducer.ts";

export interface FileType {
    _id: string
    name: string
    type: string
    size: number
    path: string
    date: string
    user: string
    childs: string[]
    __v: number
}

export function getFiles(dirId){
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get<FileType[]>(`http://localhost:5001/api/files`, {
                params: dirId || null,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
        }catch (error){
            checkErrors(error)
        }
    }
}
