import Input_Field from "../components/utils/Input_Field";
import Button from "../components/button/Button";
const Login = () => {
    const handleChange = () => {}

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
            
            <form className="login-form">
            <div className="page-title">
                <h3>Login</h3>
            </div>
                <div className="email-field">
                    <label htmlFor="email">Email</label><br />
                    <Input_Field type='email' name='email' placeholder='Enter your email' handleChange={handleChange} />
                </div>
                <div className="password-field">
                    <label htmlFor="password">Password</label><br />
                    <Input_Field type='password' name='password' placeholder='Enter your password' handleChange={handleChange} />
                </div>
                 <div className="submit-button">
                    <Button type="submit" text='Log in' style={button_style} />
                 </div>
            </form>
         </div>
        </>
     );
}
 
export default Login;