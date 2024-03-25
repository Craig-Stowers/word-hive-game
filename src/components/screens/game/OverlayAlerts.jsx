import React, { useEffect, useState, useCallback, useRef, useImperativeHandle, forwardRef } from "react";
import Portal from "../../Portal";
import { v4 as uuidv4 } from "uuid";

const OverlayAlerts = forwardRef((props, ref) => {
   const [alertObjects, setAlertObjects] = useState([]);
   const [timestamp, setTimestamp] = useState(Date.now());

   useEffect(() => {
      const tick = setInterval(() => {
         setTimestamp(Date.now());
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

   const removeAlert = (uuid) => {
      setAlertObjects((oldValue) => {
         const filtered = oldValue.filter(({ key }) => {
            console.log("compare", uuid, key);
            return uuid !== key;
         });
         return filtered;
      });
   };

   const generateAlert = useCallback((alert) => {
      const uniqueKey = uuidv4();
      const extendedAlert = {
         ...alert,
         spawnTime: Date.now(),
         key: uniqueKey,
         timer: setTimeout(() => {
            removeAlert(uniqueKey);
         }, 3000),
      };

      console.log("generate alert", alert);

      setAlertObjects((oldValue) => {
         return [...oldValue, extendedAlert];
      });
   }, []);

   return (
      <>
         <Portal id={"bonus-letter-portal"}>
            <h2>BONUS HERE</h2>
         </Portal>
         <Portal id={"middle-letter-portal"}>
            {alertObjects.map((alert, index) => {
               const age = timestamp - alert.spawnTime;
               const yMove = age / 20;
               return (
                  <div
                     style={{
                        position: "absolute",
                        top: -yMove + "px",
                        width: "100px",
                        backgroundColor: "red",
                        transform: "translate(-50%, -50%)",
                     }}
                     key={alert.key}
                  >
                     {alert.text}
                  </div>
               );
            })}
         </Portal>
      </>
   );
});

export default OverlayAlerts;
