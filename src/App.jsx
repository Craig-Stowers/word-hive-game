import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import GameScreen from "./components/GameScreen/GameScreen";

function App() {
   const [count, setCount] = useState(0);

   return (
      <div className={"gamescreen-wrapper"}>
         <GameScreen />
      </div>
   );
}

export default App;
