import * as React from "react";
import WelcomeContent from "./../Components/WelcomeComponent/WelcomeContent";
import AuthContent from "./../Components/AuthContent/AuthContent";
import LoginRegisterForm from "../APP/LoginAndRegister/LoginRegisterForm";

import {request, setAuthToken} from "./../Components/Helpers/AxiosHelper";
import Buttons from "./../../Buttons/Buttons";

export default class AppContent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            componentToShow: "welcome"
        };
    }
    login = () => {
        this.setState({componentToShow: "login"});
    }
    logout = () => {
        this.setState({componentToShow: "welcome"});
    }
    onLogin=(e, username, password) => {
        e.preventDefault();
        request(
            "POST",
            "/auth/login",
        {login: username, password: password}
        ).then((response) => {
            this.setState({componentToShow: "messages"})
            setAuthToken(response.data.token);
        }).catch((err)=>{
            this.setState({componentToShow: "welcome"})
        })
    }
    onRegister=(e,firstName, lastName, username, email, password, rolle) => {
        request(
            "POST",
            "/auth/register",
            {
                firstName,
                lastName,
                login: username,
                email,
                password,
                role,
            }
        ).then((response) => {
            this.setState({componentToShow: "messages"});
            this.setState({componentToShow: "messages"});
        }).catch((err)=>{
            this.setState({componentToShow: "welcome"});
        })
    }
    render() {
        return (
            <div>

                <Buttons login={this.login} logout={this.logout}/>

                {this.state.componentToShow === "welcome" && <WelcomeContent/>}
                {this.state.componentToShow === "messages" && <AuthContent/>}
                {this.state.componentToShow === "login" && <LoginRegisterForm onLogin={this.onLogin} onRegister={this.onRegister}/>}
                {this.state.componentToShow === "my-projects" && <MyProjects/>}
                {this.state.componentToShow === "my-settings" && <MySettings/>}
                {this.state.componentToShow === "create-new-project" && <CreateNewProject/>}
                {this.state.componentToShow === "dashboard" && <Dashboard/>}

            </div>
        )
    };
}