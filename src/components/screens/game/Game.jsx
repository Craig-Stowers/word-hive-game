import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef } from "react";
import AnswerInput from "./AnswerInput";
import LettersPanel from "./LettersPanel";
import ScoreTicker from "./ScoreTicker";
import FootButtons from "./FootButtons";
import CompletedWords from "./CompletedWords";
import classes from "./Game.module.css";
import gameData from "../../../gameData";
import useScreenState from "../../../hooks/useScreenState";
import useCheats from "./useCheats";
import { removeLastCharacter, countOccurrences, containsAllLetters } from "../../../helpers/stringHelpers";
import { shuffleArray, filterString } from "../../../helpers/arrayHelpers";

import useOnKeyPress from "../../../hooks/useOnKeyPress";
import OverlayAlert from "./OverlayAlerts";
import OverlayPortal from "./OverlayPortal";
import withSizeObserver from "../../withSizeObserver";
import GameContent from "./GameContent";
import BestFit from "../../BestFit";

const randomSequence = shuffleArray([0, 1, 2, 3, 4, 5]);

const Game = forwardRef(({ challengeData, screen, dataIndex = 3, size }, ref) => {
   const [shuffledLetters, setShuffledLetters] = useState([]);
   const [answer, setAnswer] = useScreenState(screen, "answer", "");
   const [correctWords, setCorrectWords] = useScreenState(screen, "correctWords", []);
   const data = gameData.wordhive[dataIndex];
   const [sourceWord, setSourceWord] = useScreenState(screen, "sourceWord", data.pangram);

   const centerLetter = data.center;
   const letters = data.letters;
   const allLettersArr = [centerLetter, ...letters.split("")];

   const [randomBonusIndex, setRandomBonusIndex] = useState(0);
   const bonusLetter = data.letters[randomSequence[randomBonusIndex]];
   const availableAnswers = data.words.map((word) => word.toLowerCase()); //possibly remove as capitals could be good indicator of plural (unless game data filtered first)
   const overlayRef = useRef(null);
   const [score, setScore] = useScreenState(screen, "score", 0);
   const [disabled, setDisabled] = useState(false);

   useEffect(() => {
      const shuffled = shuffleArray(data.letters.split(""));
      setShuffledLetters(shuffled);
   }, [dataIndex]);

   useEffect(() => {
      if (correctWords.length >= 12) {
         setDisabled(true);

         overlayRef.current.generateAlert({ type: "points", text: `Puzzle complete` });
         let timer = setTimeout(() => {
            screen.change("feedback");
         }, 1500);
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

   const rotateBonus = () => {
      setRandomBonusIndex((oldValue) => {
         if (oldValue >= letters.length - 1) return 0;
         return oldValue + 1;
      });
   };

   const handleAllowedLetter = (char) => {
      if (disabled) return;
      setAnswer((oldValue) => {
         if (oldValue.length >= 20) return oldValue;
         if (char.toLowerCase() === bonusLetter.toLowerCase()) {
            overlayRef.current.generateAlert({ type: "bonus", text: "+5" });
         }

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
      if (disabled) return;
      const trimAnswer = answer.trim().toLowerCase();

      let newPoints = 0;

      if (trimAnswer.length < 4) {
         overlayRef.current.generateAlert({ type: "tip", text: "Use at least 4 letters" });
         return;
      }

      if (!trimAnswer.toLowerCase().includes(centerLetter.toLowerCase())) {
         overlayRef.current.generateAlert({ type: "tip", text: "Must include centre letter" });
         return;
      }

      const lowerCaseCorrectWords = correctWords.map((word) => word.word.toLowerCase());
      if (lowerCaseCorrectWords.includes(trimAnswer.toLowerCase())) {
         overlayRef.current.generateAlert({ type: "tip", text: "Word used already" });
         return;
      }

      if (availableAnswers.includes(trimAnswer) && !correctWords.includes(trimAnswer)) {
         setCorrectWords((oldValue) => {
            return [
               ...oldValue,
               {
                  word: trimAnswer,
                  letterOrder: (centerLetter + shuffledLetters.join("")).toLowerCase(),
                  bonusLetter: bonusLetter,
               },
            ];
         });

         let newPoints = 0;
         if (trimAnswer.length === 4) newPoints = 2;
         if (trimAnswer.length === 5) newPoints = 4;
         if (trimAnswer.length === 6) newPoints = 6;
         if (trimAnswer.length === 7) newPoints = 12;

         if (trimAnswer.length > 7) {
            newPoints = 12 + (trimAnswer.length - 7) * 3;
         }
         console.log("base points", newPoints);
         const bonusCharacterCount = countOccurrences(trimAnswer, bonusLetter);
         console.log("bonus chars found", bonusCharacterCount);
         newPoints += bonusCharacterCount * 5;
         const isPangram = containsAllLetters(trimAnswer, (centerLetter + letters).toLowerCase());
         console.log("isPangram?", isPangram);
         if (isPangram) newPoints += 7;

         console.log(`total points for ${trimAnswer} = ${newPoints}`);
         setScore((v) => v + newPoints);

         if (trimAnswer.includes(bonusLetter.toLocaleLowerCase())) {
            rotateBonus();
         }

         setAnswer("");
         overlayRef.current.generateAlert({ type: "points", text: `${newPoints} Points!` });
      } else {
         overlayRef.current.generateAlert({ type: "tip", text: "Word not in word list" });
      }
   };

   const handleDelete = () => {
      setAnswer((oldAnswer) => {
         return removeLastCharacter(oldAnswer);
      });
   };

   const contentProps = {
      centerLetter,
      shuffledLetters,
      bonusLetter,
      answer,
      handleAllowedLetter,
      handleShuffle,
      handleEnter,
      handleDelete,
      score,
      correctWords,
      classes,
   };

   return (
      <div className={classes.root}>
         <div className={classes.content}>
            {/* <BestFit {...{ width: 900, height: 600, maxScale: 1.5 }}> */}
            <GameContent {...contentProps} />
            {/* </BestFit> */}
         </div>
         <OverlayPortal mirrorElementId={"bonus-letter"} deps={[shuffledLetters]} />
         <OverlayPortal mirrorElementId={"middle-letter"} />
         <OverlayPortal mirrorElementId={"answer-box"} />
         <OverlayAlert ref={(ref) => (overlayRef.current = ref)} />
      </div>
   );
});

export default Game;
