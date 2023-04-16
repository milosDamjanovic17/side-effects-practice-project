import React, {useState, useEffect} from 'react';

// setting all authentication state management to AuthContext
const AuthContext = React.createContext({

    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoginInfo = localStorage.getItem("isLoggedIn");
    
        if (storedUserLoginInfo === "1") {
          setIsLoggedIn(true);
        }
      }, []);

    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    }; 



    return <AuthContextProvider 
        value = {{
                    isLoggedIn: isLoggedIn, 
                    onLogout: logoutHandler,
                    onLogin: loginHandler} 
                }> 
            {props.children} {/* isLoggedIn: isLoggedIn(component state) */}
        </AuthContextProvider>
}

export default AuthContext;