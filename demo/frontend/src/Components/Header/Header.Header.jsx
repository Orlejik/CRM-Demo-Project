import './Header.css'
import * as React from "react";
import {NavLink} from 'react-router-dom'

export default function Header(props) {
    return (
        <header className="header">
            <nav>
                <ul>
                    <NavLink to="/dashboard">
                        <li>Dashboard</li>
                    </NavLink>

                    <NavLink to="/my-projects">
                        <li>My Projects</li>
                    </NavLink>

                    <NavLink to="/my-settings">
                        <li>My settings</li>
                    </NavLink>

                    <NavLink to="/login-register">
                        <li>Login</li>
                    </NavLink>
                </ul>
            </nav>
        </header>
    )
}
