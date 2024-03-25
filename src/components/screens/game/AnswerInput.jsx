import React from "react";
import classes from "./AnswerInput.module.css";

const AnswerInput = ({ value, onChange, onSubmit }) => {
   return (
      <div className={classes.root}>
         <input type="text" value={value} onChange={onChange} />
      </div>
   );
};

export default AnswerInput;
