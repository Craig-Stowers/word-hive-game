import React, { useState, forwardRef, useImperativeHandle } from "react";
import { globalImagePreloader, useImagePreloader } from "../../helpers/ImageLoader";
import classes from "./Info.module.css";
import image1 from "../../assets/instructions/help-1.png";
import image2 from "../../assets/instructions/help-2.png";
import image3 from "../../assets/instructions/help-3.png";
import image4 from "../../assets/instructions/help-4.png";
import image5 from "../../assets/instructions/help-5.png";
import image6 from "../../assets/instructions/help-6.png";

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

const Info = forwardRef(({ screen }, ref) => {
   const [currPage, setCurrPage] = useState(0);
   const imagesLoaded = useImagePreloader(imageLoadPromises);

   const handleNext = () => {
      if (currPage === instructions.length - 1) {
         screen.back();
      }
      setCurrPage((oldValue) => {
         if (oldValue >= instructions.length - 1) {
            return oldValue;
         }
         return oldValue + 1;
      });
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
         <div className={classes.top}>
            <div className={classes.pageNumber}>
               {currPage + 1} / {instructions.length}
            </div>
            <div className={`roboto-slab ${classes.title}`}>How to play</div>
            <div className={classes.description}>{instructions[currPage].text}</div>
         </div>

         <div className={classes.bottom}>
            <div style={{ position: "absolute", transform: "translate(-50%, -50%)", left: "50%", top: "50%" }}>
               <div style={{ transform: "scale(0.3" }}>
                  <img src={renderAsset} />
               </div>
            </div>
         </div>
      </div>
   );
});

export default Info;
