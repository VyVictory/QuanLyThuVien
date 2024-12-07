
import { useState } from "react";
import bg_login from "../../img/login/bg_login.jpg"
import LoginForm from "./loginForm";
import ForgotPasswordFrom from "./forgotPasswordFrom";
import RegisterForm from "./registerForm";

// className={`bg-[ url('${bg_login}') ]  `}

const Login = () => {
    const [formName, setFormName] = useState('login');
    function chaneform(form) {
        setFormName(form)
    }

    return (
        <div className={`h-screen w-screen block bg-cover`} style={{ backgroundImage: `url(${bg_login})` }}>
            <div className="absolute  bg-opacity-[0%] top-0 left-0 w-screen h-full justify-center flex">
                <div className="w-[400px] h-full py-8 text-white">
                    {(() => {
                        switch (formName) {
                            case 'login':
                                return <LoginForm chaneForm={chaneform} />;
                            case 'register':
                                return <RegisterForm chaneForm={chaneform} />;
                            case 'forgotPassword':
                                return <ForgotPasswordFrom chaneForm={chaneform} />
                            default:
                                return <div>Invalid Form</div>;
                        }
                    })()}
                </div>

            </div>
        </div>

    );
}

export default Login;