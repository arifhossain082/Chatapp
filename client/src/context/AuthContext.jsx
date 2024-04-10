import { createContext, useCallback, useState, useEffect } from "react";
import { postRequest, baseURL } from "../services/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) =>{
    const registerInitial = {
        name: '',
        email: '',
        password: ''
    }

    const loginInitial = {
        email: '',
        password: ''
    }

    const [user, setUser] = useState(null);
    const [registerLoading, setRegisterLoading] = useState(false)
    const [registerError, setRegisterError] = useState(null)
    const [registerInfo, setRegisterInfo] = useState(registerInitial)
    const [loginInfo, setLoginInfo] = useState(loginInitial)
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState(null)
 
    useEffect(()=>{
        const theUser = localStorage.getItem('User');
        setUser(JSON.parse(theUser))
    },[])


    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])
    const registerUser = useCallback (async(e) => {
        e.preventDefault();
        setRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(
            `${baseURL}/auth/register`,
            JSON.stringify(registerInfo)
        )

        setRegisterLoading(false);
        if(response.error){
            return setRegisterError(response)
        }
        localStorage.setItem('User', JSON.stringify(response));
        setUser(response);
        setRegisterInfo(registerInitial)
    }, [registerInfo])


    const logoutUser = useCallback (()=>{
        localStorage.removeItem('User')
        setUser(null)
    }, [])

    const loginUser = useCallback (async (e) => {
        e.preventDefault();
        setLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(
            `${baseURL}/auth/login`,
            JSON.stringify(loginInfo)
        )

        setLoginLoading(false)
        if(response.error){
            console.log(response);
           return setLoginError(response)
        }
        localStorage.setItem('User', JSON.stringify(response))
        setUser(response)
        setLoginInfo(loginInitial)
    }, [loginInfo])

    return(
        <AuthContext.Provider value={{
            user,
            registerInfo,
            registerError,
            registerLoading,
            loginInfo,
            loginError,
            loginLoading,
            updateLoginInfo,
            updateRegisterInfo,
            loginUser,
            logoutUser,
            registerUser,
        }}>
            {children}
        </AuthContext.Provider>
    )

}

