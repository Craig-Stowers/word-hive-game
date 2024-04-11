import Buttons from "./Buttons";

const OverlayButtons = ({ children, ...props }) => {
   return (
      <div
         style={{ display: "flex", flexDirection: "column", position: "relative", height: "100%", maxHeight: "100vh" }}
      >
         <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>{children}</div>

         <div style={{ position: "absolute", left: 0, top: 0, width: "100%" }}>
            <Buttons {...props} />
         </div>
      </div>
   );
};

export default OverlayButtons;
