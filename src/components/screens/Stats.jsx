import React from "react";
import classes from "./Stats.module.css";

import AllStats from "./components/AllStats";
import BestFit from "../BestFit";
import allStatsClasses from "./components/AllStatsLarge.module.css";
import logo from "./../../assets/title-with-bee.png";

export default function Stats() {
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
                  {/* </BestFit> */}
               </div>

               <img src={logo} className={classes.logo} />
            </div>
         </div>
      </div>
   );
}
