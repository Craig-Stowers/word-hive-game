import React from "react";
import defaultClasses from "./AllStats.module.css";

export default function AllStats({ stats = [], moduleOverride = {} }) {
   console.log("module override", moduleOverride);

   const classes = {
      ...defaultClasses,
      ...moduleOverride,
   };
   const renderCell = ({ label, value }) => {
      return (
         <div className={classes.column}>
            <div className={classes.value}>{value}</div>
            <label> {label}</label>
         </div>
      );
   };

   return (
      <div className={`${classes.root}`}>
         <div className={classes.row}>
            {renderCell(stats[0])}
            {renderCell(stats[1])}
            {renderCell(stats[2])}
         </div>
         <div className={classes.row}>
            {renderCell(stats[3])}
            {renderCell(stats[4])}
            {renderCell(stats[5])}
         </div>
      </div>
   );
}
