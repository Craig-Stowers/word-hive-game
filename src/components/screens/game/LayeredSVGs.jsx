import React from "react";

const LayeredSVGs = ({ width, height, images }) => {
   const svgStyle = {
      position: "absolute",
      width: width,
      height: height,
      top: 0,
      left: 0,
   };

   return (
      <div style={{ position: "relative", width, height }}>
         {images.map((img) => {
            return (
               <svg style={svgStyle}>
                  <image href={img} style={{ width, height }} />;
               </svg>
            );
         })}
      </div>
   );
};

export default LayeredSVGs;
