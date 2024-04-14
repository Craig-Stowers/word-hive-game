import React from "react";
import classes from "./Stats.module.css";

import AllStats from "./AllStats";

import allStatsClasses from "./AllStatsLarge.module.css";
import logo from "./../../../assets/title-with-bee.png";

import CustomButton from "../../../shared/CustomButton";
import CloseIcon from "../../../assets/icons/icon-close.svg?react";
import buttonClasses from "../../layouts/Buttons.module.css";

export default function Stats({ screen }) {
   const hasPlayed = screen.globalState.game.score !== undefined;

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
               <div className={classes.panel}>
                  <h2>WORDHIVE STATISTICS - ALL GAMES</h2>

                  <div className={classes.allStatsContainer}>
                     <AllStats
                        moduleOverride={allStatsClasses}
                        stats={[
                           {
                              label: "Played",
                              value: hasPlayed ? 1 : 0,
                           },
                           {
                              label: "Solved",
                              value: hasPlayed ? 1 : 0,
                           },
                           {
                              label: "Streak",
                              value: hasPlayed ? 1 : 0,
                           },
                           {
                              label: "Pangrams",
                              value: 0,
                           },
                           {
                              label: "Avg. score",
                              value: screen.globalState.game.score || 0,
                           },
                           {
                              label: "High score",
                              value: screen.globalState.game.score || 0,
                           },
                        ]}
                     />
                  </div>

                  {/* <BestFit width={300} height={130} maxScale={3}> */}

                  {/* </BestFit> */}
               </div>

               <div className={classes.logoContainer}>
                  <img src={logo} className={classes.logo} />
               </div>
            </div>
         </div>
      </div>
   );
}
