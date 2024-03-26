import React, { useState, useEffect } from "react";
import Hex from "../../assets/hex-panel.svg?react";

export default function TipAlert({ alert, startY, endY, outY, holdTime }) {
   const [style, setStyle] = useState({
      opacity: 0,
      transition: "all 0.4s",
      marginTop: startY + "px",
      fontSize: "24px",
      padding: "5px 10px",
   });
   const updateStyle = (newValues) => {
      setStyle((oldValue) => ({
         ...oldValue,
         ...newValues,
      }));
   };
   useEffect(() => {
      if (alert.remove) {
         let timer = 0;
         updateStyle({ opacity: 0 });
         const timer1 = setTimeout(() => {
            alert.kill();
         }, (timer += 600));
         return () => {
            clearTimeout(timer1);
         };
      }
      let timer = 0;
      const timer1 = setTimeout(() => {
         updateStyle({ opacity: 1, marginTop: endY + "px" });
      }, (timer += 30));
      const timer2 = setTimeout(() => {
         updateStyle({ opacity: 0, marginTop: outY + "px" });
      }, (timer += holdTime));
      const timer3 = setTimeout(() => {
         alert.kill();
      }, (timer += 600));
      return () => {
         clearTimeout(timer1);
         clearTimeout(timer2);
         clearTimeout(timer3);
      };
   }, [alert.remove]);

   if (alert.type === "tip") return <div style={{ ...style, backgroundColor: "red" }}>{alert.text}</div>;
   if (alert.type === "points")
      return (
         <div style={{ ...style, backgroundColor: "#f2aa2e", color: "black", fontSize: "28px", padding: "6px 12px" }}>
            {alert.text}
         </div>
      );
   if (alert.type === "bonus")
      return (
         <div className={"bonus-score"} style={{ ...style, position: "relative", width: "60px", height: "50px" }}>
            <Hex />
            <div
               style={{
                  color: "black",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
               }}
            >
               {alert.text}
            </div>
         </div>
      );
   return;
}
