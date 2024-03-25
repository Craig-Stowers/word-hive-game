import React from "react";
import classes from "./Feedback.module.css";

import CompletedWords from "./game/CompletedWords";
import ScoreBars from "./components/ScoreBars";
import AllStats from "./components/AllStats";

export default function Feedback({ screen }) {
   //  const buttonStyle={{width:"60px", height:"60px"}}

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
                     <CompletedWords words={["testing", "short", "tantalizing"]} />
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
                     <ScoreBars
                        highlight={null}
                        stats={[
                           {
                              label: "4",
                              value: 0,
                           },
                           {
                              label: "5",
                              value: 1,
                           },
                           {
                              label: "6",
                              value: 3,
                           },
                           {
                              label: "+7",
                              value: 20,
                           },
                        ]}
                     />
                  </div>
                  <div className={`${classes.panel} ${classes.panel3}`}>
                     <h2>ALL GAMES</h2>
                     <AllStats
                        stats={[
                           {
                              label: "Played",
                              value: 6,
                           },
                           {
                              label: "Solved",
                              value: 3,
                           },
                           {
                              label: "Streak",
                              value: 1,
                           },
                           {
                              label: "Pangrams",
                              value: 2,
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
