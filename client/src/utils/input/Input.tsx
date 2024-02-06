import cls from './Input.module.scss'
import {InputHTMLAttributes} from "react";

interface PropsType extends InputHTMLAttributes<HTMLInputElement>{
    setValue?: (value: string) => void
}

export const Input = (props: PropsType) => {
    return (
        <input className={`${cls.Input} ${props.className}`}
               onChange={(event)=> props.setValue?.(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}/>
    );
};
