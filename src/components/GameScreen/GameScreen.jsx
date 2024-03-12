import React, { useState } from "react";
import AnswerInput from "./AnswerInput";
import LettersPanel from "./LettersPanel";
import Header from "./Header";
import FootButtons from "./FootButtons";
import CompletedWords from "./CompletedWords";
import classes from "./GameScreen.module.css";

const currLetters = ["A", "B", "C", "D", "E", "F", "G"];

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

   const handleLetterClick = (char) => {
      console.log("char", char);
   };

   return (
      <div className={classes.root}>
         <Header />
         <div className={classes.content}>
            <div className={classes.left}>
               <div className={classes.inputWrapper}>
                  <AnswerInput value={answer} onChange={handleInputChange} onSubmit={handleSubmit} />
               </div>

               <div className={classes.lettersWrapper}>
                  <LettersPanel letters={currLetters} onLetterClick={handleLetterClick} />
               </div>

               <FootButtons />
            </div>
            <div className={classes.right}>
               <div className={classes.score}>SCORE: 123</div>
               <CompletedWords />
            </div>
         </div>
      </div>
   );
};

export default GameScreen;
