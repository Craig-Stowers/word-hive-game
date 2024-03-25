import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from "react";
import AnswerInput from "./AnswerInput";
import LettersPanel from "./LettersPanel";

import FootButtons from "./FootButtons";
import CompletedWords from "./CompletedWords";
import classes from "./Game.module.css";
import gameData from "../../../gameData";
import useScreenState from "../../../hooks/useScreenState";
import useCheats from "./useCheats";
import { removeLastCharacter } from "../../../helpers/stringHelpers";
import { shuffleArray, filterString } from "../../../helpers/arrayHelpers";
import useOnKeyPress from "../../../hooks/useOnKeyPress";
import OverlayAlert from "./OverlayAlerts";

const currLetters = ["A", "B", "C", "D", "E", "F", "G"];

const Game = forwardRef(({ challengeData, screen, dataIndex = 0 }, ref) => {
   const [shuffledLetters, setShuffledLetters] = useState("");
   const [answer, setAnswer] = useScreenState(screen, "answer", "");
   const [correctWords, setCorrectWords] = useState([]);
   const data = gameData.wordhive[dataIndex];
   const centerLetter = data.center;
   const letters = data.letters;
   const allLettersArr = [centerLetter, ...letters.split("")];
   const bonusLetter = data.letters[0];
   const availableAnswers = data.words;
   const overlayRef = useRef(null);

   useEffect(() => {
      console.log("avail", availableAnswers);
      const shuffled = shuffleArray(data.letters.split(""));
      setShuffledLetters(shuffled);
   }, [dataIndex]);

   useEffect(() => {
      if (correctWords.length >= 12) {
         let timer = setTimeout(() => {
            screen.change("feedback");
         }, 1000);
         return () => clearTimeout(timer);
      }
   }, [correctWords]);

   const getters = { answer, correctWords, availableAnswers };
   const setters = { setAnswer, setCorrectWords };

   const cheats = useCheats({ getters, setters });

   useImperativeHandle(
      ref,
      () => ({
         inputNext: cheats.inputNext,
         answerNext: cheats.answerNext,
         answerAll: cheats.answerAll,
      }),
      [cheats]
   );

   const handleAllowedLetter = (char) => {
      setAnswer((oldValue) => {
         if (oldValue.length >= 20) return oldValue;
         return oldValue + char.toUpperCase();
      });
   };

   useOnKeyPress(() => handleEnter(), [], ["Enter"], [13]);
   useOnKeyPress(() => handleDelete(), [], ["Backspace", "Delete"]);
   useOnKeyPress(handleAllowedLetter, [], [...allLettersArr, ...allLettersArr.join("").toLowerCase().split("")]);

   const handleShuffle = () => {
      const shuffled = shuffleArray(data.letters.split(""));
      setShuffledLetters(shuffled);
   };

   const handleEnter = () => {
      const trimAnswer = answer.trim().toLowerCase();
      if (availableAnswers.includes(trimAnswer) && !correctWords.includes(trimAnswer)) {
         setCorrectWords((oldValue) => {
            return [...oldValue, trimAnswer];
         });
         setAnswer("");
         console.log("WELL DONE");
      } else {
         overlayRef.current.generateAlert({ type: "tip", text: "wtf you doin!" });
         //console.log("NOT A WORD");
      }
   };

   const handleDelete = () => {
      console.log("handle delete");
      setAnswer((oldAnswer) => {
         return removeLastCharacter(oldAnswer);
      });
   };

   return (
      <div className={classes.root}>
         <div className={classes.content}>
            <div className={classes.left}>
               <div className={classes.inputWrapper}>
                  <AnswerInput value={answer} />
               </div>

               <div className={classes.lettersWrapper}>
                  <LettersPanel
                     center={centerLetter}
                     letters={shuffledLetters}
                     onLetterClick={handleAllowedLetter}
                     bonusLetter={bonusLetter.toUpperCase()}
                     answer={answer}
                  />
               </div>

               <FootButtons onShuffle={handleShuffle} onEnter={handleEnter} onDelete={handleDelete} />
            </div>
            <div className={classes.right}>
               <div className={classes.score}>
                  SCORE: <span>123</span>
               </div>
               <CompletedWords words={correctWords} />
            </div>
         </div>
         <OverlayAlert ref={(ref) => (overlayRef.current = ref)} />
      </div>
   );
});

export default Game;
