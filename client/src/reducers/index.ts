import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import {thunk} from "redux-thunk";
import userReducer from "./userReducer.ts";
import fileReducer from "./fileReducer.ts";


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

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
