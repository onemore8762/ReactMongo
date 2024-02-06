import Logo from '@/assets/img/cloud.svg'
import cls from './Navbar.module.scss'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../reducers/userReducer.ts";
export const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth)
    const dispatch = useDispatch()
    return (
        <div className={cls.navbar}>
            <div className={cls.container}>
                <img src={Logo} alt="" className={cls.logo}/>
                <div className={cls.header}>MERN CLOUD</div>
                {!isAuth && <div className={cls.login}><NavLink to="/login">Войти</NavLink></div>}
                {!isAuth && <div className={cls.registration}><NavLink to="/registration">Регистрация</NavLink></div>}
                {isAuth && <div className={cls.login} onClick={() => dispatch(logout())}>Выход</div>}

            </div>
        </div>
    );
};
