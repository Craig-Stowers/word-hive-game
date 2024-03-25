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

const imageLoadPromises = globalImagePreloader.preloadImages([logo]);

const Home = ({ screen, ...props }) => {
   const imagesLoaded = useImagePreloader(imageLoadPromises);
   if (!imagesLoaded) return null;

   const smallButtonStyle = {
      width: "80px",
      height: "80px",
   };

   // console.log()
   return (
      <>
         <Portal id={"portal-background"}>
            <HoneycombBackground />
         </Portal>

         <div className={classes.root}>
            <div className={classes.header}>
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

            <div className={classes.title}>
               <img src={logo} onClick={() => onButtonHit("devmode")} />
            </div>
            <div className={classes.footer}>
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
                        onClick={() => screen.change("score")}
                     />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Home;
