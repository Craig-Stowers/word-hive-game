import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import AnswerInput from "./AnswerInput";
import LettersPanel from "./LettersPanel";

import FootButtons from "./FootButtons";
import CompletedWords from "./CompletedWords";
import classes from "./Game.module.css";
import gameData from "../../../gameData";
import useScreenState from "../../../hooks/useScreenState";

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

   useEffect(() => {
      const shuffled = shuffleArray(data.letters.split(""));
      setShuffledLetters(shuffled);
   }, [dataIndex]);

   function filterCharacters(event, allowedCharacters) {
      const char = String.fromCharCode(event.which || event.keyCode);

      if (!allowedCharacters.includes(char)) {
         return;
      }
   }

   useEffect(() => {
      if (correctWords.length >= 12) {
         let timer = setTimeout(() => {
            screen.change("feedback");
         }, 1000);
         return () => clearTimeout(timer);
      }
   }, [correctWords]);

   useImperativeHandle(
      ref,
      () => ({
         answerNext() {
            setCorrectWords((oldValue) => {
               if (oldValue.length >= 12) return oldValue;
               const filtered = availableAnswers.filter((answer) => !oldValue.includes(answer));
               return [...oldValue, filtered[Math.floor(Math.random() * filtered.length)]];
            });
         },
         answerAll() {
            setCorrectWords((oldValue) => {
               if (oldValue.length >= 12) return oldValue;
               const filtered = availableAnswers.filter((answer) => !oldValue.includes(answer));
               const batchAnswers = [];
               let index = 0;
               while (batchAnswers.length < 12 - oldValue.length) {
                  batchAnswers.push(filtered[index]);
                  index++;
               }
               return [...oldValue, ...batchAnswers];
            });
         },
      }),
      []
   );

   useEffect(() => {
      function handleKeyPress(event) {
         // Check if the Enter/Return key was pressed
         if (event.key === "Enter" || event.keyCode === 13) {
            // Trigger your action here
            handleEnter();
         }
      }

      // Attach key listener to document
      document.addEventListener("keypress", handleKeyPress);

      return () => {
         document.removeEventListener("keypress", handleKeyPress);
      };
   }, [answer]); // Empty dependency array ensures this effect runs only once (on mount)

   function filterString(inputString, allowedCharacters) {
      return inputString
         .split("")
         .filter((char) => allowedCharacters.includes(char))
         .join("");
   }

   const handleInputChange = (event) => {
      const value = filterString(event.target.value.toUpperCase(), allLettersArr);
      console.log("add letter", value);
      setAnswer(value);
   };

   const handleSubmit = () => {
      // Handle submission of answer, possibly invoking onEvent callback
      // with custom event name and answer value
      onEvent("answerSubmitted", answer);
      // Additional logic related to answer submission
   };

   const handleLetterClick = (char) => {
      setAnswer((oldValue) => {
         return oldValue + char.toUpperCase();
      });
   };

   function shuffleArray(array) {
      // Make a copy of the array
      const shuffledArray = [...array];

      // Shuffle the remaining elements
      for (let i = shuffledArray.length - 1; i >= 0; i--) {
         const j = Math.floor(Math.random() * (i + 1));
         [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      }

      return shuffledArray;
   }

   const handleShuffle = () => {
      const shuffled = shuffleArray(data.letters.split(""));
      setShuffledLetters(shuffled);
   };

   const handleEnter = () => {
      const trimAnswer = answer.trim().toLowerCase();
      console.log("test", trimAnswer);
      if (availableAnswers.includes(trimAnswer) && !correctWords.includes(trimAnswer)) {
         setCorrectWords((oldValue) => {
            return [...oldValue, trimAnswer];
         });
         setAnswer("");
         console.log("WELL DONE");
      } else {
         console.log("NOT A WORD");
      }
   };

   function removeLastCharacter(str) {
      // Check if the string is not empty
      if (str.length > 0) {
         // Use slice to return the substring excluding the last character
         return str.slice(0, -1);
      } else {
         // If the string is empty, return the string as is
         return str;
      }
   }

   const handleDelete = () => {
      setAnswer((oldAnswer) => {
         return removeLastCharacter(oldAnswer);
      });
   };

   return (
      <div className={classes.root}>
         <div className={classes.content}>
            <div className={classes.left}>
               <div className={classes.inputWrapper}>
                  <AnswerInput value={answer} onChange={handleInputChange} onSubmit={handleSubmit} />
               </div>

               <div className={classes.lettersWrapper}>
                  <LettersPanel
                     center={centerLetter}
                     letters={shuffledLetters}
                     onLetterClick={handleLetterClick}
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
      </div>
   );
});

export default Game;
