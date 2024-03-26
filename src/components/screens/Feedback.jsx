import React, { useEffect, useState } from "react";
import classes from "./Feedback.module.css";

import CompletedWords from "./game/CompletedWords";
import ScoreBars from "./components/ScoreBars";
import AllStats from "./components/AllStats";

export default function Feedback({ screen }) {
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
   //  const buttonStyle={{width:"60px", height:"60px"}}
   useEffect(() => {
      const loadAnswers = () => {
         const answers = screen.globalState.game.correctWords;
         console.log("FETCH ANSWERS", answers);
         if (!answers) return;

         setAnswers(answers);

         const fours = answers.filter((v) => v.length === 4).length;
         const fives = answers.filter((v) => v.length === 5).length;
         const sixes = answers.filter((v) => v.length === 6).length;
         const sevens = answers.filter((v) => v.length >= 7).length;

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

      const timer = setTimeout(() => {
         loadAnswers();
      }, 100);

      return () => clearTimeout(timer);
   }, [screen]);

   return (
      <div className={classes.root}>
         <div className={classes.inner}>
            <div className={classes.content}>
               <div className={classes.column1}>
                  <div className={`${classes.panel} ${classes.panel1}`}>
                     <div className={classes.scoreText}>
                        SCORE <span>124</span>
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
                        Source word: <span>snitches</span>
                     </div>
                  </div>
                  <div className={`${classes.panel} ${classes.panel2}`}>
                     <h2>LETTERS</h2>
                     <ScoreBars highlight={null} stats={barData} />
                  </div>
                  <div className={`${classes.panel} ${classes.panel3}`}>
                     <h2>ALL GAMES</h2>
                     <AllStats
                        stats={[
                           {
                              label: "Played",
                              value: 1,
                           },
                           {
                              label: "Solved",
                              value: 1,
                           },
                           {
                              label: "Streak",
                              value: 1,
                           },
                           {
                              label: "Pangrams",
                              value: 0,
                           },
                           {
                              label: "Avg. score",
                              value: 184,
                           },
                           {
                              label: "High score",
                              value: 302,
                           },
                        ]}
                     />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
