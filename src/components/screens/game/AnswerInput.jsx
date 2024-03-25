import React from "react";
import classes from "./AnswerInput.module.css";

const AnswerInput = ({ value, onChange }) => {
   const handleInputChange = (event) => {
      if (onChange) onChange(event);
   };

   let dynamicFontSize = 28;
   if (value.length > 12) {
      const diff = value.length - 12;
      dynamicFontSize -= diff * 1.14;
   }
   return (
      <div className={classes.root}>
         <input
            type="text"
            value={value.toUpperCase()}
            onChange={handleInputChange}
            disabled={true}
            style={{ fontSize: dynamicFontSize + "px" }}
         />
      </div>
   );
};

export default AnswerInput;
