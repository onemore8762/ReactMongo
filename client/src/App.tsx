import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Registration} from "./components/registration/Registration.tsx";
import {Navbar} from "./components/navbar/Navbar.tsx";
import {Login} from "./components/registration/Login.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./actions/user.ts";
import {Disk} from "./components/disk/Disk.tsx";


function App() {

    const isAuth = useSelector((state) => state.user.isAuth)
    const dispatch = useDispatch()


    useEffect(() => {
       dispatch(auth())
    },[])
    return (
        <BrowserRouter>
            <div className='app'>
                <Navbar/>
                <div className='wrap'>
                    {!isAuth ?
                        <Routes>
                            <Route path="/registration" element={< Registration/>}/>
                            <Route path="/login" element={< Login/>}/>
                            <Route path="*" element={<Navigate to='/login'></Navigate>}/>
                        </Routes>
                        :
                        <Routes>
                            <Route path="/" element={<Disk/>}/>
                            <Route path="*" element={<Navigate to='/'></Navigate>}/>
                        </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App
