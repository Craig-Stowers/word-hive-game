import Buttons from "./Buttons";

const OverlayButtons = ({ children, ...props }) => {
   return (
      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
         {children}

         <div style={{ position: "absolute", left: 0, top: 0, width: "100%" }}>
            <Buttons {...props} />
         </div>
      </div>
   );
};

export default OverlayButtons;
