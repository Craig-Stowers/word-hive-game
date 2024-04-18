import React, { useEffect, useState } from "react";
import classes from "./Feedback.module.css";

import CompletedWords from "../game/CompletedWords";
import ScoreBars from "./ScoreBars";
import AllStats from "../stats/AllStats";
import allStatsClasses from "./AllStatsFeedback.module.css";
import getScores from "../../getScores";
import CustomButton from "../../../shared/CustomButton";
import CloseIcon from "../../../assets/icons/icon-close.svg?react";
import buttonClasses from "../../layouts/Buttons.module.css";

export default function Feedback({ screen }) {
   const daysElapsed = screen.globalData.daysElapsed;
   const [answers, setAnswers] = useState([]);
   const [barData, setBarData] = useState([
      {
         label: "4",
         value: 0,
      },
      {
         label: "5",
         value: 0,
      },
      {
         label: "6",
         value: 0,
      },
      {
         label: "+7",
         value: 0,
      },
   ]);

   const [played, solved, streak, pangrams, avgScore, highScore] = getScores(screen.globalData.localData);

   console.log("test scores", [played, solved, streak, pangrams, avgScore, highScore]);

   //  const buttonStyle={{width:"60px", height:"60px"}}
   useEffect(() => {
      const loadAnswers = () => {
         console.log("FEEDBACK localData", screen.globalData.localData);
         const answers = screen.globalData.localData.success[screen.globalData.daysElapsed].correct;

         // console.log("answers", answers);

         if (!answers) return;

         // console.log("answers", answers);

         setAnswers(answers);

         const fours = answers.filter((v) => v.word.length === 4).length;
         const fives = answers.filter((v) => v.word.length === 5).length;
         const sixes = answers.filter((v) => v.word.length === 6).length;
         const sevens = answers.filter((v) => v.word.length >= 7).length;

         setBarData([
            {
               label: "4",
               value: fours,
            },
            {
               label: "5",
               value: fives,
            },
            {
               label: "6",
               value: sixes,
            },
            {
               label: "+7",
               value: sevens,
            },
         ]);
      };

      // const timer = setTimeout(() => {
      loadAnswers();
      // }, 100);

      // return () => clearTimeout(timer);
   }, [screen.globalData.daysElapsed, screen.globalData.localData]);

   const score = screen.globalData.localData.success[daysElapsed]?.score;

   const pangram = screen.globalData.currChallengeData?.panagrams;

   if (!score) return;

   return (
      <div className={classes.root}>
         <div className={classes.buttonRow}>
            <div className={classes.closeContainer}>
               <CustomButton
                  className={`${buttonClasses.close}`}
                  render={() => <CloseIcon />}
                  onClick={() => screen.actions.close()}
               />
            </div>
         </div>
         <div className={classes.inner}>
            <div className={classes.content}>
               <div className={classes.column1}>
                  <div className={`${classes.panel} ${classes.panel1}`}>
                     <div className={classes.scoreText}>
                        SCORE <span>{screen.globalData.localData.success[daysElapsed].score}</span>
                     </div>
                     <div className={classes.message}>Very good!</div>
                  </div>
                  <div className={`${classes.panel} ${classes.panel2}`}>
                     <h2>YOUR WORDS</h2>
                     <CompletedWords words={answers} />
                  </div>
               </div>

               <div className={classes.column2}>
                  <div className={`${classes.panel} ${classes.panel1}`}>
                     <div className={classes.source}>
                        Source word: <span>{pangram}</span>
                     </div>
                  </div>
                  <div className={`${classes.panel} ${classes.panel2}`}>
                     <h2>LETTERS</h2>
                     <ScoreBars highlight={null} stats={barData} />
                  </div>
                  <div className={`${classes.panel} ${classes.panel3}`}>
                     <h2>ALL GAMES</h2>
                     <div className={`${classes.allStatsContainer}`}>
                        <AllStats
                           moduleOverride={allStatsClasses}
                           columns={3}
                           stats={[
                              {
                                 label: "Played",
                                 value: played,
                              },
                              {
                                 label: "Solved",
                                 value: solved,
                              },
                              {
                                 label: "Streak",
                                 value: streak,
                              },
                              {
                                 label: "Pangrams",
                                 value: pangrams,
                              },
                              {
                                 label: "Avg. score",
                                 value: avgScore,
                              },
                              {
                                 label: "High score",
                                 value: highScore,
                              },
                           ]}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
