import './Header.css'
import * as React from "react";
import {NavLink} from 'react-router-dom'
import { useAuth } from '../../Security/AuthContext';

export default function Header(props) {
    const {token} = useAuth();
    const menuItems = [
        { label: "Dashboard", path: "/dashboard", auth: true },
        { label: "My settings", path: "/my-settings", auth: true },
        { label: "My Project", path: "/my-projects", auth: true },
        { label: "Login", path: "/login-register", guestOnly: true }
    ]

    return (
        <header className="header">
            <nav>
                <ul>
                    {menuItems.map(item => {
                        if (item.auth && !token) return null;
                        if (item.guestOnly && token) return null;

                        return (
                        <NavLink key={item.path} to={item.path}>
                            <li>{item.label}</li>
                        </NavLink>
                        );
                    })}
                </ul>
            </nav>
        </header>
    )
}
