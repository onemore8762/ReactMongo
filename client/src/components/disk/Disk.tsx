import {useEffect} from "react";
import {getFiles} from "@/actions/file.ts";
import cls from './Disk.module.scss'
import {FileList} from "./fileList/FileList.tsx";
import {Popup} from "@/components/disk/Popup.tsx";
import {setCurrentDir, setPopupDisplay} from "@/reducers/fileReducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";

export const Disk = () => {
    const dispatch = useAppDispatch()
    const currentDir = useAppSelector(state => state.files.currentDir)
    const dirStack = useAppSelector(state => state.files.dirStack)

    const showPopupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        console.log(dirStack)
        const backDirId = dirStack.pop()
        console.log(dirStack)
        dispatch(setCurrentDir(backDirId))
    }

    useEffect(() => {
        void dispatch(getFiles(currentDir))
    }, [currentDir]);
    return (
        <div className={cls.disk}>
            <div className={cls.btns}>
                <button className={cls.back} onClick={() => backClickHandler()}>Назад</button>
                <button className={cls.create} onClick={() => showPopupHandler()}>Создать папку</button>
            </div>
            <FileList/>
            <Popup/>
        </div>
    );
};
