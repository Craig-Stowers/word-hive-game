import React from "react";
import defaultClasses from "./AllStats.module.css";
import { splitArrayIntoChunks } from "../../../helpers/arrayHelpers";
import withSizeObserver from "../../withSizeObserver";

const AllStats = ({ stats = [], moduleOverride = {}, size, columns }) => {
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

   let cols = columns ? columns : size.width < 500 ? 2 : 3;

   const statChunks = splitArrayIntoChunks(stats, cols);

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
