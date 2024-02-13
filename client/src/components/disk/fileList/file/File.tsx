import cls from './File.module.scss'
import {FileType} from "@/actions/file.ts";
import dirLogo from '@/assets/dirLogo.svg'
import fileLogo from '@/assets/fileLogo.svg'
import dayjs from 'dayjs';
import {pushToStack, setCurrentDir} from "@/reducers/fileReducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";


interface PropsType {
    file: FileType
}




export const File = ({file}:PropsType) => {
    const dispatch = useAppDispatch()
    const currentDir = useAppSelector(state => state.files.currentDir)
    const openDirHandler = () => {
        dispatch(pushToStack(currentDir))
        dispatch(setCurrentDir(file._id))
    }

    return (
        <div className={cls.file} onClick={file.type === 'dir' ? () => openDirHandler(): () => {}}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={cls.img}/>
            <div className={cls.name}>{file.name}</div>
            <div className={cls.date}>{dayjs(file.date).format("DD-MM-YYYY")}</div>
            <div className={cls.size}>{file.size}</div>
        </div>
    );
};
