import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// useReducer function for email input, uvek se prosledjuje state i action
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }

  return { value: "", isValid: false };
};

// useReducer function for password input
const passwordReducer = (state, action) => {

  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  /* implementation od useReducer hook for email input

    useReducer always returns array of two items, it receives two arguments, a reducer function and initial starting state
  */
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
    // ekvivalent ovoga sa useState principom => value === enteredEmail(""); isValid === emailIsValid()
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  //example of how useEffect works
    useEffect(() => {
      console.log("EFFECT RUNNING");

      return () => {
        console.log("EFFECT CLEANUP");
      };
    }, []);

    const {isValid: emailIsValid} = emailState;
    const {isValid: passwordIsValid} = passwordState;

    useEffect(() => {
      const indentifier = setTimeout(() => {
        console.log("CHECKING FORM VALIDITY");
        setFormIsValid(
          emailIsValid && passwordIsValid
        );
      }, 500);
      return () => {
        console.log("CLEANUP CODE");
        clearTimeout(indentifier);
      };
    }, [emailIsValid, passwordIsValid]); // => (DEPRECATED, COMMENT KREIRAN DOK JE RADJENO SA: [emailState, passwordState] ) svaki put kad se promeni state emailState i passwordState, izvrsice se sta god da je navedeno u useEffect callback funkciji

  //
  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // kad bi koristili samo useEffect
    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})

    // kad bi koristili samo useEffect
    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;



/**
 * 
 * useEffect() => koristimo kada updateujemo state gde uglavnom novi state ne zavisi toliko od prethodnog: u ovom slucaju to je const[formIsValid, setFormIsValid] = useState(false);
 * 
 * useReducer() => koristimo da bi merge-ovali dva ili vise state-a u jedan, i taj jedan state ce menjati callback funkcija: u ovom slucaju imamo 2 primera, uzecemo:
 *      const [emailState, dispatchEmail] = useReducer(emailReducer, {
            value: "",
            isValid: null,
        });

        emailState => u ovaj const smo merge-ovali dva state-a enteredEmail & emailIsValid,
        dispatchEmail => callback funkcija koja ce menjati state emailState,
        emailReducer => funckija koja ce biti trigerovana SVAKI PUT kada se desi promena unutar dispatchEmail funkcije
        
        value: "",
        isValid: null, => pocetni state emailState-a
 * 
 */
