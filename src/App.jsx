import { useState } from "react";
import "./App.css";
import useLocalData from "./hooks/useLocalData";

import useTextFileLoader from "./hooks/useTextFileLoader";
import ScreenManager from "./components/ScreenManager";

import { screenMaps } from "./configs/screenMaps";

let startingDate = "2024-02-20";
const defaultData = {
   version: 0.6,
   success: {},
   failure: {},
   incomplete: {},
};

function App() {
   const [count, setCount] = useState(0);
   const [localData, setLocalData] = useLocalData("word-hive-data", defaultData);
   const challengeListData = useTextFileLoader("/challenges/index.json");
   const currChallengeData = useTextFileLoader(challengeListData && `/challenges/${challengeListData[0]}`);

   const testStyle = {
      width: "500px",
      height: "500px",
      backgroundColor: "pink",
   };

   return (
      <>
         <div className={"background"} id="portal-background"></div>
         <ScreenManager screenMaps={screenMaps} initialScreen={"game"} key="manager" />
      </>
   );
}

export default App;
