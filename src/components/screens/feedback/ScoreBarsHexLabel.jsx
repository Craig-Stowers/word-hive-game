import React from "react";
import classes from "./ScoreBarsHexLabel.module.css";
import Hex from "../../../assets/hex-panel.svg?react";

export default function ScoreBarsHexLabel({ label }) {
   return (
      <div className={classes.root}>
         <Hex />
         <div className={classes.label}>{label}</div>
      </div>
   );
}
