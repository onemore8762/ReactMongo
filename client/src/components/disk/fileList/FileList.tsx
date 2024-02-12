import cls from './FileList.module.scss'
import {useSelector} from "react-redux";
import {File} from "./file/File.tsx";

export const FileList = () => {
    const files = useSelector(state => state.files.files).map(file => <File key={file._id} file={file}/>)
    return (
        <div className={cls.fileList}>
            <div className={cls.header}>
                <div className={cls.name}>Название</div>
                <div className={cls.date}>Дата</div>
                <div className={cls.size}>Размер</div>
            </div>
            {files}
        </div>
    );
};
