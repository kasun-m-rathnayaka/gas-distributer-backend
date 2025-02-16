import {createContext, useState} from 'react';

const authcontext = createContext();

const AuthProvider = ({children}) => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState("");

    return (
        <authcontext.Provider value={{
            isLoggedIn,
            userRole,
            setIsLoggedIn,
            setUserRole,
            showLogin,
            setShowLogin,
            showSignup,
            setShowSignup
        }}>
            {children}
        </authcontext.Provider>
    );
}

export {authcontext, AuthProvider};