import React, { useState } from "react";
import AnswerInput from "./AnswerInput";

const GameScreen = ({ challengeData, onEvent }) => {
   const [answer, setAnswer] = useState("");

   const handleInputChange = (event) => {
      setAnswer(event.target.value);
   };

   const handleSubmit = () => {
      // Handle submission of answer, possibly invoking onEvent callback
      // with custom event name and answer value
      onEvent("answerSubmitted", answer);
      // Additional logic related to answer submission
   };

   return (
      <div className="game-screen">
         <div className="left-panel">
            <div className="top">
               <AnswerInput value={answer} onChange={handleInputChange} onSubmit={handleSubmit} />
            </div>
            <div className="bottom">{/* Additional content for left panel */}</div>
         </div>
         <div className="right-panel">
            <div className="top">{/* Additional content for right panel */}</div>
            <div className="bottom">{/* Additional content for right panel */}</div>
         </div>
      </div>
   );
};

export default GameScreen;
