import './Header.css'
import * as React from "react";
import {NavLink} from 'react-router-dom'
import { useAuth } from '../../Security/AuthContext';

export default function Header(props) {
    const {token, user, logout} = useAuth();
    const menuItems = [
        { label: "Dashboard", path: "/dashboard", auth: true },
        { label: "My settings", path: "/my-settings", auth: true },
        { label: "My Project", path: "/my-projects", auth: true },
        { to: "/admin", label: "Admin", auth: true, role: "ADMIN" },
    ]

    return (
        <header className="header">
            <nav>
                <ul>
                    {menuItems
                    .filter(item=>{
                        if(item.auth && !token) return false;
                        if(item.role && user?.role !== item.role) return false;
                        return true
                    })
                    .map(item => {
                        if (item.auth && !token) return null;
                        if (item.guestOnly && token) return null;

                        return (
                        <NavLink key={item.path} to={item.path}>
                            <li>{item.label}</li>
                        </NavLink>
                        );
                    })}

                    {token 
                        ? <button onClick={logout} >Logout</button>
                        : <NavLink to="/login-register"> Login </NavLink>}
                </ul>
            </nav>
        </header>
    )



}
