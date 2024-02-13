import {useState} from 'react';
import cls from './Authorization.module.scss'

import {Input} from "../../utils/input/Input.tsx";
import {login} from "@/actions/user.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useAppDispatch()

    return (
        <div className={cls.authorization}>
            <div className={cls.header}>Авторизация</div>
            <Input value={email} className={cls.input} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} className={cls.input}  setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Войти</button>
        </div>
    );
};
