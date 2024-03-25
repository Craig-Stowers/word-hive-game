import React from "react";
import CustomButton from "../../shared/CustomButton";
import CloseIcon from "../../assets/icons/icon-close.svg?react";
import classes from "./Buttons.module.css";

export default function Buttons({ screen, ...props }) {
   const { variation } = props;

   const handleNext = () => {
      if (screen.ref.current.next) screen.ref.current.next();
   };

   return (
      <div style={{ display: "flex", padding: "20px" }}>
         {variation === "cross&next" && (
            <>
               <div style={{ marginRight: "auto" }}>
                  <CustomButton
                     className={`${classes.close}`}
                     render={() => {
                        return <CloseIcon />;
                     }}
                     onClick={() => screen.actions.close()}
                  />
               </div>
               <div style={{ marginLeft: "auto" }}>
                  <CustomButton
                     className={`${classes.next}`}
                     render={() => {
                        return <span>NEXT</span>;
                     }}
                     onClick={handleNext}
                  />
               </div>
            </>
         )}
         {variation === "cross" && (
            <>
               <div style={{ marginLeft: "auto", marginRight: "40px", marginTop: "14px" }}>
                  <CustomButton
                     className={`${classes.close}`}
                     render={() => {
                        return (
                           <div style={{ width: "100%", height: "100%", transform: "scale(1)" }}>
                              <CloseIcon />
                           </div>
                        );
                     }}
                     onClick={() => screen.actions.close()}
                  />
               </div>
            </>
         )}
      </div>
   );
}
