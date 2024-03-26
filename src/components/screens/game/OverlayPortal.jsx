import React, { useRef, useEffect } from "react";
import { useMultiState } from "../../../hooks/useMultiState";

export default function OverlayPortal({ deps = [], mirrorElementId }) {
   const overlayRef = useRef(null);
   const state = useMultiState("left", "top");

   useEffect(() => {
      const element = document.getElementById(mirrorElementId);
      const rect = element.getBoundingClientRect();
      const thisRect = overlayRef.current.getBoundingClientRect();
      const relYperc = (rect.top - thisRect.top) / thisRect.height;
      const relXperc = (rect.left - thisRect.left) / thisRect.width;
      state.setleft(relXperc * 100 + "%");
      state.settop(relYperc * 100 + "%");
   }, [...deps]);

   return (
      <div
         ref={(ref) => {
            overlayRef.current = ref;
         }}
         style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            pointerEvents: "none",
         }}
      >
         <div
            id={mirrorElementId + "-portal"}
            style={{
               position: "absolute",
               left: state.left,
               top: state.top,
               transform: "translate(-50%,-50%)",
            }}
         ></div>
      </div>
   );
}
