import React, { useContext } from "react";

import AuthContext from "../../store/auth-context";
import classes from "./Navigation.module.css";

const Navigation = () => {
  const ctxValue = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {/* if ctxValue.isLoggedIn state is true, <li> */}
        {ctxValue.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctxValue.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctxValue.isLoggedIn && (
          <li>
            <button onClick={ctxValue.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
