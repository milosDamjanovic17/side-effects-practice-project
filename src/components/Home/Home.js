import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Home.module.css';
import AuthContext from '../../store/auth.context';

const Home = (props) => {

  const authCtx = useContext(AuthContext)

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={authCtx.onLogout}>Logout</Button> {/* DEPRECATED, ITS UPDATED TO authCtx context we'll still use props because we want to make sure that this button ONLY does logout function */}
    </Card>
  );
};

export default Home;
