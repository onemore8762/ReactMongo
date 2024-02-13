import {Input} from "@/utils/input/Input.tsx";
import {useState} from "react";
import cls from './Disk.module.scss'
import {setPopupDisplay} from "@/reducers/fileReducer.ts";
import {createDir} from "@/actions/file.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {AppStateType} from "@/reducers";

export const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useAppSelector(state => state.files.popupDisplay)
    const currentDir = useAppSelector((state: AppStateType) => state.files.currentDir)

    const dispatch = useAppDispatch()
    const closeHandler = () => {
        dispatch(setPopupDisplay('none'))
    }
    const createDirHandler = () => {
        void dispatch(createDir(currentDir, dirName))
    }
    return (
        <div className={cls.popup} onClick={() => closeHandler()} style={{display: popupDisplay }}>
            <div className={cls.content} onClick={(event) => event.stopPropagation()}>
                <div className={cls.header}>
                    <div className={cls.title}>Создать новую папку</div>
                    <button className={cls.close} onClick={() => closeHandler()}>X</button>
                </div>
                <Input type='text'
                       className={cls.input}
                       placeholder="Введите название папки..."
                       value={dirName}
                       setValue={setDirName}/>
                <button className={cls.create} onClick={() => createDirHandler()}>Создать</button>
            </div>
        </div>
    );
};

