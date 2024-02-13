import {FileType} from "@/actions/file.ts";

const defaultState = {
    files: [] as FileType[],
    currentDir: null as null | string,
    popupDisplay: 'none' as string,
    dirStack: [] as string[]
}

type stateType = typeof defaultState

export default function fileReducer(state: stateType = defaultState, action: FileActionsType): stateType{
    switch (action.type){
        case "SET_FILES":
            return  {...state, files: action.payload}
        case "SET_CURRENT_DIR":
            return  {...state, currentDir: action.payload}
        case "ADD_FILE":
            return  {...state, files: [...state.files, action.payload]}
        case "SET_POPUP_DISPLAY":
            return  {...state, popupDisplay: action.payload }
        case "PUSH_TO_STACK":
            return  {...state, dirStack: [...state.dirStack, action.payload ]}
        default:
            return state
    }
}



export const setFiles = (files: FileType[]) => ({type: "SET_FILES", payload: files} as const)
export const setCurrentDir = (dir: string) => ({type: "SET_CURRENT_DIR", payload: dir} as const)
export const addFile = (file: FileType) => ({type: "ADD_FILE", payload: file} as const)
export const setPopupDisplay = (display: 'none' | 'flex') => ({type: "SET_POPUP_DISPLAY", payload: display} as const)
export const pushToStack = (dir: string | null) => ({type: "PUSH_TO_STACK", payload: dir as string} as const)

export type FileActionsType =
    | ReturnType<typeof setFiles>
    | ReturnType<typeof setCurrentDir>
    | ReturnType<typeof addFile>
    | ReturnType<typeof setPopupDisplay>
    | ReturnType<typeof pushToStack>
