import Input_Field from "../components/utils/Input_Field";
import Button from "../components/button/Button";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';


const Login = () => {
    const {loginInfo, loginError, loginLoading, updateLoginInfo, loginUser,} = useContext(AuthContext)
    
    const handleChange = (e) => {
        updateLoginInfo({
            ...loginInfo,
            [e.target.name] : e.target.value
        })
    }

    const button_style = {
        background: '#00B212',
        border: 'none',
        color: '#ffffff',
        width: '100px',
        height: '30px'
    }
    return ( 
        <>
         <div className="login">
            
            <form className="login-form" onSubmit={loginUser}>
            <div className="page-title">
                <h3>Login</h3>
            </div>
                <div className="email-field">
                    <label htmlFor="email">Email</label><br />
                    <Input_Field type='email' name='email' value={loginInfo?.email} placeholder='Enter your email' handleChange={handleChange} />
                </div>
                <div className="password-field">
                    <label htmlFor="password">Password</label><br />
                    <Input_Field type='password' name='password' value={loginInfo?.password} placeholder='Enter your password' handleChange={handleChange} />
                </div>
                 <div className="submit-button">
                    <Button type="submit" text={loginLoading ? 'Please wait ...' : 'Login'} style={button_style} />
                 </div>
                 {loginError?.error && (
                    <div className="error">
                        <p>{loginError?.message}</p>
                    </div>
                 )}
                 <div className="register_link">
                    <Link to="/register">I don't have an account</Link>
                 </div>
            </form>
         </div>
        </>
     );
}
 
export default Login;