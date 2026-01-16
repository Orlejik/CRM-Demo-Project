import './Header.css'
import * as React from "react";
import {NavLink} from 'react-router-dom'
import { useAuth } from '../../Security/AuthContext';
import { useEffect, useRef, useState } from "react";

export default function Header(props) {
    const {token, user, logout} = useAuth();
    const menuRef = useRef(null)
    const [open, setOpen] = useState(false);
      // закрытие при клике вне меню
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <header className="header">
            <nav className="nav">
                {/* LEFT */}
                <ul className="nav-left">
                    {token && (
                        <>
                            <NavLink to="/dashboard"><li>Dashboard</li></NavLink>

                            {user?.role === "ADMIN" && (
                                <NavLink to="/admin"><li>Admin</li></NavLink>
                            )}
                        </>
                    )}
                </ul>

                {/* RIGHT */}
                <ul className="nav-right">
                    {/* ACCOUNT ICON — ВСЕГДА */}
                    <li className="account-wrapper" ref={menuRef}>
                        <button
                            className="account-btn"
                            onClick={() => token && setOpen(!open)}
                            aria-label="Account menu"
                        >
                            👤
                        </button>

                        {/* DROPDOWN — ТОЛЬКО ЕСЛИ ЗАЛОГИНЕН */}
                        {token && open && (
                            <ul className="account-dropdown">
                                <li>
                                    <NavLink to="/my-settings" onClick={() => setOpen(false)}>
                                    <div>
                                      My settings  
                                    </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/my-projects" onClick={() => setOpen(false)}> 
                                    <div>My Projects</div></NavLink>
                                </li>
                                
                                <li>
                                    <div>
                                       <button
                                        className="logout-btn"
                                        onClick={() => {
                                            logout();
                                            setOpen(false);
                                        }}
                                    >
                                        Logout
                                    </button> 
                                    </div>
                                    
                                </li>
                            </ul>
                        )}
                    </li>

                    {/* LOGIN ДЛЯ ГОСТЯ */}
                    {!token && (
                        <li>
                            <NavLink to="/login-register">Login</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
