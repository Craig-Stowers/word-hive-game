import React, { useEffect, useState, useRef } from "react";
import classes from "./Home.module.css";

import CustomButton from "../../shared/CustomButton";
import StatsIcon from "../../assets/icons/icon-stats.svg?react";
import InfoIcon from "../../assets/icons/icon-info.svg?react";
import CloseIcon from "../../assets/icons/icon-close.svg?react";

import logo from "../../assets/title-large.png";
import { globalImagePreloader, useImagePreloader } from "../../helpers/ImageLoader";
import Portal from "../Portal";
import HoneycombBackground from "../HoneycombBackground";
import withSizeObserver from "../withSizeObserver";
import BestFit from "../BestFit";

const imageLoadPromises = globalImagePreloader.preloadImages([logo]);

const adminMode = true;

const Home = ({ screen, size, ...props }) => {
   const imagesLoaded = useImagePreloader(imageLoadPromises);
   if (!imagesLoaded) return null;
   console.log("images", imagesLoaded);

   const smallButtonStyle = {
      width: "80px",
      height: "80px",
      margin: "5px",
   };

   const onButtonHit = (type) => {
      if (type === "close") {
         console.log("close");
      } else if (type === "devmode") {
         console.log("screen", screen);
         screen.globalData.setShowTools(true);
      }
   };
   // console.log()
   return (
      <>
         <Portal id={"portal-background"}>
            <HoneycombBackground />
         </Portal>

         <div className={classes.root}>
            <div className={classes.header}>
               <div style={{ width: "20%", height: "12vh", marginLeft: "auto" }}>
                  <BestFit {...{ width: 87, height: 87, maxScale: 4 }}>
                     <div>
                        <CustomButton
                           style={smallButtonStyle}
                           render={() => {
                              return <CloseIcon />;
                           }}
                           onClick={() => {
                              onButtonHit("close");
                           }}
                        />
                     </div>
                  </BestFit>
               </div>
            </div>

            <div className={classes.title}>
               <img
                  src={logo}
                  style={{ pointerEvents: adminMode ? "auto" : "none" }}
                  onClick={() => onButtonHit("devmode")}
               />
            </div>
            <div className={classes.footer}>
               <BestFit {...{ width: 460, height: 90, maxScale: 1.8 }}>
                  <div className={classes.buttonsWrapper}>
                     <div className={classes.buttons}>
                        <CustomButton
                           style={smallButtonStyle}
                           render={() => {
                              return <InfoIcon />;
                           }}
                           onClick={() => screen.change("info")}
                        />
                        <CustomButton
                           render={() => {
                              return <span style={{ paddingLeft: "32px", paddingRight: "32px" }}>PLAY</span>;
                           }}
                           onClick={() => screen.change("game")}
                        />

                        <CustomButton
                           style={smallButtonStyle}
                           render={() => {
                              return <StatsIcon />;
                           }}
                           onClick={() => screen.change("stats")}
                        />
                     </div>
                  </div>
               </BestFit>
            </div>
         </div>
      </>
   );
};

export default withSizeObserver(Home);
