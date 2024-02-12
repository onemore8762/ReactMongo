import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getFiles} from "../../actions/file.ts";
import cls from './Disk.module.scss'
import {FileList} from "./fileList/FileList.tsx";

export const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)

    useEffect(() => {
        dispatch(getFiles(currentDir))
    }, []);
    return (
        <div className={cls.disk}>
            <div className={cls.btns}>
                <button className={cls.back}>Назад</button>
                <button className={cls.create}>Создать папку</button>
            </div>
            <FileList/>
        </div>
    );
};
