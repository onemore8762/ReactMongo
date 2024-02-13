import axios from "axios";
import {checkErrors} from "./checkErrors.ts";
import {Dispatch} from "redux";
import {addFile, setFiles} from "@/reducers/fileReducer.ts";

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

export function getFiles(dirId: string | null) {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.get<FileType[]>(`http://localhost:5001/api/files`, {
                params: {
                    parent: dirId || null
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (error) {
            console.log('попал')
            checkErrors(error)
        }
    }
}

export function createDir(dirId: string | null, name: string) {
    return async (dispatch: Dispatch) => {
        try {
            const response = await axios.post(`http://localhost:5001/api/files`, {
                name,
                parent: dirId,
                type: 'dir'
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(addFile(response.data))
        } catch (error) {
            checkErrors(error)
        }
    }
}

export function uploadFile(file: any, dirId: string | null) {
    return async (dispatch: Dispatch) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId){
                formData.append('parent', dirId)
            }
            const response = await axios.post(`http://localhost:5001/api/files/upload`, formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    },
                    onUploadProgress: progressEvent => {
                        const totalLength = progressEvent.event.lengthComputable ? progressEvent.total: progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length')
                        console.log(totalLength)
                        if (totalLength){
                            const progress = Math.round((progressEvent.loaded * 100)/ totalLength)
                            console.log(progress)
                        }
                    }
                })
            dispatch(addFile(response.data))
        } catch (error) {
            checkErrors(error)
        }
    }
}
