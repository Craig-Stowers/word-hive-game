import React, { useEffect, useState, useImperativeHandle, forwardRef, useRef, useMemo } from "react";

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

const Game = forwardRef(({ screen, dataIndex = 3, size }, ref) => {
   const daysElapsed = screen.globalData.daysElapsed;
   const [refsAvailable, setRefsAvailable] = useState(false);

   const [shuffledLetters, setShuffledLetters] = useState([]);

   const storedData =
      screen.globalData.localData?.success[daysElapsed] || screen.globalData.localData?.incomplete[daysElapsed];

   const [answer, setAnswer] = useState(storedData?.answer || "");
   const [correctWords, setCorrectWords] = useState(
      storedData?.correct || []
      //   screen.globalData.localData?.incomplete[daysElapsed]?.correct || []
   );

   const [score, setScore] = useState(
      storedData?.score || 0
      // screen.globalData.localData?.incomplete[daysElapsed]?.score || 0
   );
   // const data = gameData.wordhive[dataIndex];

   const [centerLetter, setCenterLetter] = useState(null);
   const [letters, setLetters] = useState(null);
   const [allLettersArr, setAllLettersArr] = useState([]);
   const [bonusLetter, setBonusLetter] = useState(null);
   const [availableAnswers, setAvailableAnswers] = useState([]);

   useEffect(() => {
      // const currIncomplete = screen.globalData.localData?.incomplete[day];
      const days = screen.globalData.daysElapsed;

      //cleanse data
      if (screen.globalData.localData.success[days]) {
         if (screen.globalData.localData.incomplete[days]) {
            const allIncomplete = { ...screen.globalData.localData.incomplete };
            delete allIncomplete[days];
            screen.globalData.setLocalData((oldData) => {
               return {
                  ...oldData,
                  incomplete: allIncomplete,
               };
            });
         }
         return;
      }

      screen.globalData.setLocalData((oldData) => {
         return {
            ...oldData,
            incomplete: {
               ...oldData.incomplete,
               [screen.globalData.daysElapsed]: {
                  answer,
                  correct: correctWords,
                  score,
               },
            },
         };
      });
   }, [answer, correctWords, screen.globalData.daysElapsed]);

   // const centerLetter = data.center;
   // const letters = data.letters;

   //  const allLettersArr = [centerLetter, ...letters.split("")];

   const [randomBonusIndex, setRandomBonusIndex] = useState(0);

   const overlayRef = useRef(null);

   const [disabled, setDisabled] = useState(false);

   const letterOrder = (centerLetter + shuffledLetters.join("")).toLowerCase();

   // const [bonusLetter] = useMemo(() => {
   //    data.letters[randomSequence[randomBonusIndex]];
   //    return [data.letters[randomSequence[0]]];
   // }, [screen.globalData.currChallengeData]

   useEffect(() => {
      if (!screen.globalData.currChallengeData) return;

      const data = screen.globalData.currChallengeData;

      const { key, answers, letters } = screen.globalData.currChallengeData;

      const filteredLetters = letters
         .split("")
         .filter((char) => char !== key)
         .map((char) => char.toUpperCase())
         .join("");

      setCenterLetter(key.toUpperCase());
      setLetters(filteredLetters);
      setAllLettersArr([key.toUpperCase(), ...filteredLetters.split("")]);
      const bonusLetter = filteredLetters[randomSequence[randomBonusIndex]];
      setBonusLetter(bonusLetter);

      const availableAnswers = data.answers.map((word) => word.toLowerCase()); //possibly remove as capitals could be good indicator of plural (unless game data filtered first)
      setAvailableAnswers(availableAnswers);
      const shuffled = shuffleArray(filteredLetters.split(""));
      setShuffledLetters(shuffled);
   }, [screen.globalData.currChallengeData, randomBonusIndex, randomSequence]);

   useEffect(() => {
      if (!overlayRef.current) return;
      if (correctWords.length >= 12) {
         setDisabled(true);

         const days = screen.globalData.daysElapsed;

         console.log("UPDATE FOR DAY", days);

         if (!screen.globalData.localData.success[days]) {
            screen.globalData.setLocalData((oldData) => {
               const allIncomplete = { ...oldData.incomplete };
               delete allIncomplete[days];

               return {
                  ...oldData,
                  incomplete: allIncomplete,
                  success: {
                     ...oldData.success,
                     [days]: {
                        answer,
                        correct: correctWords,
                        score,
                     },
                  },
               };
            });
         }

         let timer = setTimeout(() => {
            overlayRef.current.generateAlert({ type: "points", text: `Puzzle complete` });
         }, 400);

         let timer2 = setTimeout(() => {
            // console.log("CHANGING TO FEEDBACK", screen.globalData.localData.success);
            screen.change("feedback");
         }, 4000);
         return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
         };
      }
   }, [correctWords, refsAvailable, screen.globalData.daysElapsed, screen.globalData.localData]);

   const getters = { answer, correctWords, availableAnswers, letterOrder, bonusLetter };
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
      const shuffled = shuffleArray(letters.split(""));
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

         const bonusCharacterCount = countOccurrences(trimAnswer, bonusLetter);

         newPoints += bonusCharacterCount * 5;
         const isPangram = containsAllLetters(trimAnswer, (centerLetter + letters).toLowerCase());

         if (isPangram) newPoints += 7;

         //  console.log(`total points for ${trimAnswer} = ${newPoints}`);
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

   if (!bonusLetter) return null;

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
         <OverlayAlert
            ref={(ref) => {
               setRefsAvailable(true);
               overlayRef.current = ref;
            }}
         />
      </div>
   );
});

export default Game;
