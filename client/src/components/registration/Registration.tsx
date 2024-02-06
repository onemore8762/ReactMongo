import {useState} from 'react';
import cls from './Authorization.module.scss'
import {registration} from "../../actions/user";
import {Input} from "../../utils/input/Input.tsx";

export const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={cls.authorization}>
            <div className={cls.header}>Регистрация</div>
            <Input value={email} className={cls.input} setValue={setEmail} type="text" placeholder="Введите email..."/>
            <Input value={password} className={cls.input} setValue={setPassword} type="password" placeholder="Введите пароль..."/>
            <button className={cls.btn} onClick={() => registration(email, password)}>Зарегистрироваться</button>
        </div>
    );
};

