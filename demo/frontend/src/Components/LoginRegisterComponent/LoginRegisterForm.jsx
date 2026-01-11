import * as React from "react";
import classNames from "classnames";

export default class LoginRegisterForm extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            active: "login",

            firstName: "",
            lastName: "",
            login: "",
            email:"",
            password: "",
            rolle: "",
            onLogin: props.onLogin,
            onRegister: props.onRegister,
        };
    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({[name]: value});
    }

    onSubmitLogin = (e) => {
        this.state.onLogin(e, this.state.login, this.state.password);
    };

    onSubmitRegister = (e) => {
        this.state.onRegister(
            e,

            this.state.firstName,
            this.state.lastName,
            this.state.login,
            this.state.email,
            this.state.password,
            this.state.rolle,);
    }


    render() {
        return (
            <div className="row justify-content-center ">
                <div className="col-4">
                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button id="tab-login"
                                    onClick={() => this.setState({active: "login"})}
                                    className={classNames("nav-link", this.state.active === "login" ? "active" : "")}>login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button id="tab-register"
                                    onClick={() => this.setState({active: "register"})}
                                    className={classNames("nav-link", this.state.active === "register" ? "active" : "")}>register
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "login" ? "show active" : "")}
                            id="pills-login">
                            <form onSubmit={this.onSubmitLogin}>
                                <div className="form-outline mb-4">
                                    <input type="login" id="loginLoginName" name="login" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginLoginName"> Username</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="userLoginPassword" name="password" className="form-control" onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="userLoginPassword"> Password</label>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-block mb-4" type="submit"> Login</button>
                                </div>
                            </form>
                        </div>

                        <div
                            className={classNames("tab-pane", "fade", this.state.active === "register" ? "show active" : "")}
                            id="pills-register">
                            <form onSubmit={this.onSubmitRegister}>
                                <div className="form-outline mb-4">
                                    <input type="text" id="firstname" name="firstName" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="firstname"> Firstname</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="text" id="lastname" name="lastName" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="lastname"> Lastname</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="login" id="loginRegisterName" name="login" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="loginRegisterName"> Username</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="email" id="userEmail" name="email" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="userEmail"> E-Mail</label>
                                </div>
                                <div className="form-outline mb-4">
                                    <input type="password" id="userRegisterPassword" name="password" className="form-control"
                                           onChange={this.onChangeHandler}/>
                                    <label className="form-label" htmlFor="userRegisterPassword"> Password</label>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-block mb-4" type="submit"> Register</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}