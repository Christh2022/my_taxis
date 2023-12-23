import UserAuth from "../Hooks/UserAuth";
import LoginForm from "../components/LoginForm/LoginForm";
import "./css/login.css";

const Login = () => {
    const { currentUser } = UserAuth();
    console.log(currentUser);
    return (
        <>
            <div className="login">
                <div className="left"></div>
                <div className="right"></div>
            </div>
            <LoginForm/>
        </>
    );
};

export default Login;
