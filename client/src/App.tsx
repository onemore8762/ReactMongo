import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Registration} from "./components/registration/Registration.tsx";
import {Navbar} from "./components/navbar/Navbar.tsx";
import {Login} from "./components/registration/Login.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./actions/user.ts";


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
                {!isAuth &&
                    <Routes>
                        <Route path="/registration" element={< Registration/>}/>
                        <Route path="/login" element={< Login/>}/>
                    </Routes>
                }
            </div>
        </BrowserRouter>
    )
}

export default App
