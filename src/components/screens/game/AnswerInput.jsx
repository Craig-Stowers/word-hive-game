import React, { useEffect, useRef } from "react";
import classes from "./AnswerInput.module.css";

const AnswerInput = ({ value, onChange }) => {
   const handleInputChange = (event) => {
      if (onChange) onChange(event);
   };
   const inputRef = useRef(null);

   useEffect(() => {
      // Function to check the input and focus if empty
      const focusOnInput = () => {
         setTimeout(() => {
            if (inputRef.current && inputRef.current.value === "") {
               inputRef.current.focus();
            }
         }, 0); // A delay of 0-100 milliseconds is usually enough
      };
      focusOnInput();
      // Add an event listener for the blur event
      const inputElement = inputRef.current;
      inputElement.addEventListener("blur", focusOnInput);

      // Cleanup function to remove the event listener
      return () => {
         inputElement.removeEventListener("blur", focusOnInput);
      };
   }, []); // Empty dependency array means this effect runs only once after the initial render

   let dynamicFontSize = 28;
   if (value.length > 12) {
      const diff = value.length - 12;
      dynamicFontSize -= diff * 1.14;
   }

   useEffect(() => {
      if (value === "") {
         inputRef.current.focus();
      }
   }, [value]);

   const showBlinker = value === "";

   return (
      <div className={classes.root} style={{ position: "relative" }}>
         <input
            ref={inputRef}
            type="text"
            value={value.toUpperCase()}
            onChange={handleInputChange}
            disabled={value.length}
            style={{ fontSize: dynamicFontSize + "px" }}
         />
         <div
            id={"answer-box"}
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
         ></div>
      </div>
   );
};

export default AnswerInput;
