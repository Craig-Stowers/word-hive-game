import React, { useEffect, useState, useCallback, useRef, useImperativeHandle, forwardRef } from "react";
import Portal from "../../Portal";
import { v4 as uuidv4 } from "uuid";
import TipAlert from "../../alerts/TipAlert";

const OverlayAlerts = forwardRef((props, ref) => {
   const [alertObjects, setAlertObjects] = useState([]);
   const [timestamp, setTimestamp] = useState(Date.now());

   useEffect(() => {
      const tick = setInterval(() => {
         //setTimestamp(Date.now());
      }, 1000 / 120);
      return () => {
         cleanAlerts();
         clearTimeout(tick);
      };
   }, []);

   const cleanAlerts = () => {
      setAlertObjects((oldValue) => {
         oldValue.forEach((alert) => {
            if (alert.timer) clearTimeout(alert.timer);
         });
         return [];
      });
   };

   useImperativeHandle(
      ref,
      () => ({
         generateAlert: generateAlert,
      }),
      []
   );

   const removeAlert = (killuuid) => {
      setAlertObjects((oldValue) => {
         const filtered = oldValue.filter(({ uuid }) => {
            return killuuid !== uuid;
         });

         return filtered;
      });
   };

   const generateAlert = useCallback((alert) => {
      const uniqueKey = uuidv4();

      const kill = () => {
         removeAlert(uniqueKey);
      };

      const extendedAlert = {
         ...alert,
         spawnTime: Date.now(),
         uuid: uniqueKey,
         kill,
         remove: false,
      };

      setAlertObjects((oldValue) => {
         const copy = oldValue.map((alert) => {
            return { ...alert, remove: true };
         });

         return [...copy, extendedAlert];
      });
   }, []);

   const tips = alertObjects.filter((alert) => alert.type === "tip" || alert.type === "points");
   const bonus = alertObjects.filter((alert) => alert.type === "bonus");
   const middleBonus = alertObjects.filter((alert) => alert.type === "mid-bonus");

   const bonusConfig = {
      startY: 0,
      endY: -80,
      outY: -80,
      holdTime: 1500,
   };

   const tipConfig = {
      startY: 28,
      endY: 112,
      outY: 90,
      holdTime: 4000,
   };

   const pointsConfig = {
      startY: 28,
      endY: 180,
      outY: 240,
      holdTime: 1800,
   };

   return (
      <>
         <Portal id={"middle-letter-portal"}>
            {middleBonus.map((alert, index) => {
               const age = timestamp - alert.spawnTime;
               const yMove = age / 20;
               return (
                  <div
                     style={{
                        position: "absolute",
                        left: "50%",
                        top: -yMove + "px",
                        width: "100px",
                        backgroundColor: "red",
                        transform: "translate(-50%, -50%)",
                     }}
                     key={alert.uuid}
                  >
                     {alert.text}
                  </div>
               );
            })}
         </Portal>
         <Portal id={"bonus-letter-portal"}>
            {bonus.map((alert, index) => {
               return (
                  <div
                     style={{
                        fontFamily: "'Roboto Condensed', serif",
                        position: "absolute",
                        fontWeight: "bold",
                        left: "50%",
                        top: "50%",
                        width: "500px", //effectively a max width for child (an "absolute" "hack")
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                     }}
                     key={alert.uuid}
                  >
                     <div style={{ margin: "auto" }}>
                        <TipAlert alert={alert} {...bonusConfig} />
                     </div>
                  </div>
               );
            })}
         </Portal>
         <Portal id={"answer-box-portal"}>
            {tips.map((alert, index) => {
               const config = alert.type === "points" ? pointsConfig : tipConfig;
               return (
                  <div
                     style={{
                        fontFamily: "'Roboto Condensed', serif",
                        position: "absolute",
                        fontWeight: "bold",
                        left: "50%",
                        top: "50%",
                        width: "500px", //effectively a max width for child (an "absolute" "hack")
                        transform: "translate(-50%, -50%)",
                        display: "flex",
                     }}
                     key={alert.uuid}
                  >
                     <div style={{ margin: "auto" }}>
                        <TipAlert alert={alert} {...config} />
                     </div>
                  </div>
               );
            })}
         </Portal>
      </>
   );
});

export default OverlayAlerts;
