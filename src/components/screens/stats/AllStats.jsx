import React from "react";
import defaultClasses from "./AllStats.module.css";
import { splitArrayIntoChunks } from "../../../helpers/arrayHelpers";
import withSizeObserver from "../../withSizeObserver";

const AllStats = ({ stats = [], moduleOverride = {}, size }) => {
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

   let columns = 3;

   if (size.width < 500) columns = 2;

   const statChunks = splitArrayIntoChunks(stats, columns);

   return (
      <div className={`${classes.root}`}>
         {statChunks.map((chunk, i) => {
            return (
               <div className={classes.row} key={"stat-row" + i}>
                  {chunk.map((stat, i) => {
                     return renderCell(stat);
                  })}
               </div>
            );
         })}
      </div>
   );
};

export default withSizeObserver(AllStats);
