import React from "react";
import classes from "./Feedback.module.css";

import CompletedWords from "./game/CompletedWords";

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
                  </div>
                  <div className={`${classes.panel} ${classes.panel3}`}>
                     <h2>ALL GAMES</h2>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
