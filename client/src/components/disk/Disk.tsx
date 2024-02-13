import {DragEvent, useEffect, useState} from "react";
import {getFiles, uploadFile} from "@/actions/file.ts";
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
    const [dragEnter, setDragEnter] = useState(false)

    const showPopupHandler = () => {
        dispatch(setPopupDisplay('flex'))
    }

    const backClickHandler = () => {
        const backDirId = dirStack.pop() as string
        dispatch(setCurrentDir(backDirId))
    }

    const fileUploadHandler = (event: any) => {
        const files = [...event.target.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))

    }
    const dragEnterHandler = (event: DragEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    const dragLeaveHandler = (event: DragEvent) => {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    const onDropHandler = (event: DragEvent) => {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    useEffect(() => {
        void dispatch(getFiles(currentDir))
    }, [currentDir, dispatch]);
    return ( !dragEnter ?
        <div className={cls.disk} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
            <div className={cls.btns}>
                <button className={cls.back} onClick={() => backClickHandler()}>Назад</button>
                <button className={cls.create} onClick={() => showPopupHandler()}>Создать папку</button>
                <div className={cls.upload}>
                    <label htmlFor="upload" className={cls.label}>Загрузить файл</label>
                    <input multiple={true} onChange={(event) => fileUploadHandler(event)} type='file' className={cls.uploadInput} id='upload'/>
                </div>
            </div>
            <FileList/>
            <Popup/>
        </div> :
            <div className={cls.area} onDrop={onDropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
                Перетащите файлы сюда
            </div>
    );
};
