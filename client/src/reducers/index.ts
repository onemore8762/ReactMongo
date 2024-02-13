import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import {thunk, ThunkDispatch} from "redux-thunk";
import userReducer, {UserActionsType} from "./userReducer.ts";
import fileReducer, {FileActionsType} from "./fileReducer.ts";


const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer
})

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AllActionType = UserActionsType | FileActionsType


// @ts-ignore
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppStateType = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AllActionType>
