import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppStateType} from "@/reducers";

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
