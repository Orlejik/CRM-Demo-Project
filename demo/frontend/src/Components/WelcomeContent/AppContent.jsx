import * as React from "react";
import WelcomeContent from "./WelcomeContent";
import AuthContent from "../AuthContent/AuthContent";
import LoginRegisterForm from "../LoginRegisterComponent/LoginRegisterForm";

import {request, setAuthToken} from "../Helpers/AxiosHelper/AxiosHelper";
import Buttons from "./../../Components/PageContentComponents/ButtonsComponent/Buttons";

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
        e.preventDefault();
        request(
            "POST",
            "/auth/register",
            {
                firstName: firstName,
                lastName: lastName,
                login: username,
                email: email,
                password: password,
                rolle:rolle,
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

            </div>
        )
    };
}