import React from "react";
import classes from "./Stats.module.css";

import AllStats from "./components/AllStats";
import BestFit from "../BestFit";
import allStatsClasses from "./components/AllStatsLarge.module.css";
import logo from "./../../assets/title-with-bee.png";

export default function Stats({ screen }) {
   const hasPlayed = screen.globalState.game.score !== undefined;
   return (
      <div className={classes.root}>
         <div className={classes.inner}>
            <div className={classes.content}>
               <div className={classes.panel}>
                  <h2>WORDHIVE STATISTICS - ALL GAMES</h2>

                  {/* <BestFit width={300} height={130} maxScale={3}> */}
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
                  {/* </BestFit> */}
               </div>

               <img src={logo} className={classes.logo} />
            </div>
         </div>
      </div>
   );
}
