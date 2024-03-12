import React from "react";

const AnswerInput = ({ value, onChange, onSubmit }) => {
   return (
      <div className="answer-input">
         <input type="text" value={value} onChange={onChange} placeholder="Enter your answer..." />
         <button onClick={onSubmit}>Submit</button>
      </div>
   );
};

export default AnswerInput;
