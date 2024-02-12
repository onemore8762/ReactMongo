import cls from './File.module.scss'
import {FileType} from "@/actions/file.ts";
import dirLogo from '@/assets/dirLogo.svg'
import fileLogo from '@/assets/fileLogo.svg'
import dayjs from 'dayjs';


interface PropsType {
    file: FileType
}




export const File = ({file}:PropsType) => {

    return (
        <div className={cls.file}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className={cls.img}/>
            <div className={cls.name}>{file.name}</div>
            <div className={cls.date}>{dayjs(file.date).format("DD-MM-YYYY")}</div>
            <div className={cls.size}>{file.size}</div>
        </div>
    );
};
