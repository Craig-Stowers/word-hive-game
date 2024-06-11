import React, { useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { globalImagePreloader, useImagePreloader } from "../../helpers/ImageLoader";
import classes from "./Info.module.css";
import image1 from "../../assets/instructions/h1.png";
import image2 from "../../assets/instructions/h2.png";
import image3 from "../../assets/instructions/h3.png";
import image4 from "../../assets/instructions/h4.png";
import image5 from "../../assets/instructions/h5.png";
import image6 from "../../assets/instructions/h6.png";
import withSizeObserver from "../withSizeObserver";
import MaxChildHeight from "./components/MaxChildHeight";
import CustomButton from "../../shared/CustomButton";
import CloseIcon from "../../assets/icons/icon-close.svg?react";
import buttonClasses from "../../components/layouts/Buttons.module.css";

const imageLoadPromises = globalImagePreloader.preloadImages([image1, image2, image3, image4, image5, image6]);

const instructions = [
   {
      text: "Create 12 words using the letters in the hive. The longer the word, the higher the score. Proper nouns are not accepted. A new Word Hive is released every day. Good luck!",
      asset: image1,
   },
   {
      text: "Select the letters to enter your word and use the Delete button to remove letters and try again.",
      asset: image2,
   },
   {
      text: "Your word needs at least 4 letters and must include the centre letter. You can use the same letter more than once. To submit your word, select the Enter button.",
      asset: image3,
   },
   {
      text: "The longer the word, the higher the score. Words with 7 letters score 12 points, and longer words score 3 points for each additional letter.",
      asset: image4,
   },
   {
      text: "The green power letter scores an extra 5 points each time it's used in a word. Once you submit a word with a power letter, the hive will highlight a new power letter.",
      asset: image5,
   },
   {
      text: "Each Word Hive challenge is based on a source word that uses all the letters in the hive. Finding the source word or another pangram word that use all 7 letters at least once scores 7 extra points.",
      asset: image6,
   },
];

const Info = forwardRef(({ screen, size }, ref) => {
   const [currPage, setCurrPage] = useState(0);
   const [fade, setFade] = useState(true); // State to manage fade in/out
   const imagesLoaded = useImagePreloader(imageLoadPromises);

   const handleNext = () => {
      if (currPage === instructions.length - 1) {
         screen.back();
         return;
      }
      setFade(false); // Start by fading out current instruction
      setTimeout(() => {
         // Wait for fade out, then change page and fade in
         setCurrPage((oldValue) => (oldValue < instructions.length - 1 ? oldValue + 1 : oldValue));
         setFade(true);
      }, 300); // Timeout duration should match CSS transition-duration
   };

   useImperativeHandle(
      ref,
      () => ({
         next: handleNext,
      }),
      [currPage]
   );

   const renderAsset = instructions[currPage].asset;

   return (
      <div className={`${classes.root} roboto-condensed`}>
         <div className={classes.buttonRow}>
            <CustomButton
               className={`${buttonClasses.close}`}
               render={() => <CloseIcon />}
               onClick={() => screen.actions.close()}
            />

            <CustomButton
               className={`${buttonClasses.next}`}
               style={{ marginLeft: "auto" }}
               render={() => <span>{currPage + 1 === instructions.length ? "CLOSE" : "NEXT"}</span>}
               onClick={handleNext}
            />
         </div>
         <div className={`${classes.inner}`}>
            <div className={classes.top}>
               <div className={classes.pageNumber}>
                  {currPage + 1} / {instructions.length}
               </div>
               <div className={`roboto-slab ${classes.title}`}>How to play</div>
               <MaxChildHeight className={classes.descriptionContainer} style={{ opacity: fade ? 1 : 0 }}>
                  {instructions.map((instruction, index) => (
                     <div
                        key={index}
                        className={`${classes.description}`}
                        style={{ visibility: index === currPage ? "visible" : "hidden" }}
                     >
                        {instruction.text}
                     </div>
                  ))}
               </MaxChildHeight>
            </div>

            <div className={classes.bottom}>
               <div className={classes.bottomInner}>
                  <div className={classes.imageContainer} style={{ opacity: fade ? 1 : 0 }}>
                     <img src={renderAsset} alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
});

export default withSizeObserver(Info);
