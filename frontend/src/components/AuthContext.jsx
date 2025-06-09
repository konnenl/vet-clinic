import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);

    const login = (userData)=>{
        setIsAuth(true);
        setUser(userData);
        localStorage.setItem('token', 'your-auth-token');
    };

    const logout = () => {
        setIsAuth(false);
        setUser(null);
        localStorage.removeItem('token');
        };

    return (
    <AuthContext.Provider value={{ isAuth, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}