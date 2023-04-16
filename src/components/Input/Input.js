import React, { useRef, useImperativeHandle } from "react";

import styles from "./Input.module.css";

// ref property is bind to ref value inside <Input> JSX component in parent component, exposes ref={xxxx} value and makes it configurable separately
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activateFocus = () => {
    inputRef.current.focus();
  };

  // this is just rare use case, usually don't use useImperativeHandle, try finding another solution with props for example
  useImperativeHandle(ref, () => {
    return {
      activateFocus: activateFocus, // FIELDS POINTS TO ACTIVATE FOCUS FUNCTION ABOVE
    };
  });

  return (
    <div
      className={`${styles.control} ${
        props.isValid === false ? styles.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
});

export default Input;
