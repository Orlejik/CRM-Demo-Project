import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    useEffect(() => {
       if (!token) {
        setUser(null);
        return;
    }

    try {
        const decoded = jwtDecode(token);

        // JWT обязан иметь sub / exp
        if (!decoded.sub || !decoded.exp) {
            throw new Error("Invalid JWT structure");
        }

        setUser(decoded);
    } catch (e) {
        console.error("Invalid token, logging out", e);
        logout();
    }
    }, [token]);

    const login = (jwt) => {
        localStorage.setItem("token", jwt);
        setToken(jwt);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);