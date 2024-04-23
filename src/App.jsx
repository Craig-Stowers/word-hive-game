import { useMemo, useState, useEffect } from "react";
import "./App.css";
import useLocalData from "./hooks/useLocalData";

import useTextFileLoader from "./hooks/useTextFileLoader";
import ScreenManager from "./components/ScreenManager";

import { screenMaps } from "./configs/screenMaps";
import { daysBetween, addDaysToDate, formatDate } from "./helpers/dateMethods";
import Modal from "./components/Modal";
import AdminPanel from "./components/AdminPanel";
let startingDate = "2024-04-16";
const defaultData = {
   version: 0.6,
   success: {},
   failure: {},
   incomplete: {},
};

function App() {
   const [localData, setLocalData] = useLocalData("word-hive-data", defaultData);
   const challengeListData = useTextFileLoader("/challenges/challenges.json");

   console.log("CHALLENGE LIST DATA", challengeListData);
   const [daysElapsed, setDaysElapsed] = useState(Math.floor(daysBetween(startingDate)));
   const todaysDate = addDaysToDate(startingDate, daysElapsed);
   const [showTools, setShowTools] = useState(false);

   const cycleDaysElapsed = challengeListData ? daysElapsed % challengeListData.length : 0;

   const currChallengeData = useTextFileLoader(
      challengeListData && `/challenges/${challengeListData[cycleDaysElapsed]}`
   );

   useEffect(() => {
      function adjustHeight() {
         console.log("adjusting height");
         var vh = window.innerHeight * 0.01;
         document.documentElement.style.setProperty("--vh", `${vh}px`);
      }

      // Listen for resize events
      window.addEventListener("resize", adjustHeight);
      window.addEventListener("orientationchange", adjustHeight);
      adjustHeight();

      // Set the height initially
      return () => {
         window.removeEventListener("orientationchange", adjustHeight);
         window.removeEventListener("resize", adjustHeight);
      };
   }, [currChallengeData]);

   console.log("localdata", localData);

   const globalData = useMemo(() => {
      if (!currChallengeData) return null;
      return {
         localData,
         setLocalData,
         challengeListData,
         currChallengeData,
         startingDate,
         setShowTools,
         daysElapsed,
      };
   }, [currChallengeData, daysElapsed, localData]);

   const score = localData.success[daysElapsed]?.score;

   const status = localData.success[daysElapsed]
      ? "complete"
      : localData.incomplete[daysElapsed]
      ? "incomplete"
      : "not started";

   const adminData = {
      version: 0.71,
      "start date": formatDate(startingDate),
      "simulated date": todaysDate,
      day: daysElapsed + " / " + challengeListData?.length,
      "challenge index": cycleDaysElapsed,
      "todays letters": currChallengeData?.letters,
      "center letter": currChallengeData?.key,
      pangram: currChallengeData?.panagrams,
      status: status + (score ? ` - ${score} points` : ""),

      // "todays status": getTodaysStatus().status,
      // "todays save data": JSON.stringify(getTodaysStatus().value),
      // ...stats.totals,
   };

   const handleAdminEvent = (event) => {
      console.log("event", event);
      if (event.type === "gototoday") {
         setDaysElapsed(Math.floor(daysBetween(startingDate)));
      }

      if (event.type === "view") {
         const baseUrl = window.location.href; // Gets the base URL of the current page
         const url = `/challenges/${challengeListData[cycleDaysElapsed]}`;
         const fullUrl = new URL(url, baseUrl); // Creates a full URL combining the base and the relative path
         window.open(fullUrl, "_blank"); // Opens the new URL in a new tab
      }

      // if (event.type === "cleartoday") {
      //    setLocalData((oldData) => {
      //       const newData = {
      //          ...oldData,
      //          incomplete: { ...oldData.incomplete },
      //          success: { ...oldData.success },
      //          failure: { ...oldData.failure },
      //       };
      //       if (newData.incomplete[daysElapsed]) delete newData.incomplete[daysElapsed];
      //       if (newData.success[daysElapsed]) delete newData.success[daysElapsed];
      //       if (newData.failure[daysElapsed]) delete newData.failure[daysElapsed];
      //       return newData;
      //    });
      // }
      if (event.type === "clearall") {
         setLocalData(defaultData);
      }
      if (event.type === "changedays") {
         const amount = event.days;
         setDaysElapsed((oldState) => {
            const newValue = oldState + amount;
            return newValue < 0 ? 0 : newValue;
         });
      }
   };

   return (
      <>
         <div className={"background"} id="portal-background"></div>
         <ScreenManager screenMaps={screenMaps} initialScreen={"home"} key="manager" globalData={globalData} />
         {showTools && (
            <Modal onClose={() => setShowTools(false)}>
               <AdminPanel adminData={adminData} onAdminEvent={handleAdminEvent} />
            </Modal>
         )}
      </>
   );
}

export default App;
