import {useState} from "react";
import classNames from "classnames";
import { useAuth } from "../../Security/AuthContext";
import { request } from "../../Components/Helpers/AxiosHelper/AxiosHelper";

export default function LoginRegisterForm() {
    const{login} = useAuth();
    const [active, setActive] = useState("login");
    const[form, setForm] = useState({
        firstName:"",
        lastName: "",
        login: "",
        email:"",
        password: ""
    });
    const[errorMessage, setErrorMessage] = useState(null);
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const onSubmitLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(null);
        try{
            const response = await request("POST", "/auth/login", form);
            if (!response?.data?.token) {
                throw new Error("No token in response");
}
            login(response.data.token)
        }catch(err){
            setErrorMessage(
                setErrorMessage(
                err.response?.data?.message ||
                JSON.stringify(err.response?.data) 
                || "Login Failed"
            )
            );
        }
    };
    const onSubmitRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(null);

        try{
            const response = await request("POST", "/auth/register", form);
            login(response.data.token)
        }catch(err){
            setErrorMessage(
                err.response?.data?.message ||
                JSON.stringify(err.response?.data) 
                || "Registration Failed"
            )
        }
    };
        return (
            <div className="row justify-content-center">
            <div className="col-4">
                <ul className="nav nav-pills nav-justified mb-3">
                    <li className="nav-item">
                        <button
                            className={classNames("nav-link", active === "login" && "active")}
                            onClick={() => setActive("login")}
                        >
                            Login
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={classNames("nav-link", active === "register" && "active")}
                            onClick={() => setActive("register")}
                        >
                            Register
                        </button>
                    </li>
                </ul>
                {active === "login" && (
                    <form onSubmit={onSubmitLogin}>
                        <input name="login" placeholder="Username" className="form-control mb-2" onChange={onChangeHandler} />
                        <input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={onChangeHandler} />
                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                )}
                {active === "register" && (
                    <form onSubmit={onSubmitRegister}>
                        <input name="firstName" placeholder="First name" className="form-control mb-2" onChange={onChangeHandler} />
                        <input name="lastName" placeholder="Last name" className="form-control mb-2" onChange={onChangeHandler} />
                        <input name="login" placeholder="Username" className="form-control mb-2" onChange={onChangeHandler} />
                        <input name="email" type="email" placeholder="Email" className="form-control mb-2" onChange={onChangeHandler} />
                        <input name="password" type="password" placeholder="Password" className="form-control mb-2" onChange={onChangeHandler} />
                        <button className="btn btn-success w-100">Register</button>
                    </form>
                )}
                {errorMessage && (
                    <div className="alert alert-danger mt-3">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
        )
}