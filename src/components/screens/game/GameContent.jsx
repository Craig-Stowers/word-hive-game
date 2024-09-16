import React, { useRef, useContext, useEffect } from "react";
import AnswerInput from "./AnswerInput";
import LettersPanel from "./LettersPanel";
import ScoreTicker from "./ScoreTicker";
import CompletedWords from "./CompletedWords";
import FootButtons from "./FootButtons";
import withSizeObserver from "../../withSizeObserver";
import BestFit from "../../BestFit";
import FitWidth from "../../FitWidth";
import AspectRatioBox from "../../layouts/AspectRatioBox";
import toggleIcon from "../../../assets/progress-toggle.png";
import progressPanel from "../../../assets/progress-panel.png";
import useResizeObserver from "../../../hooks/useResizeObserver";
import { GlobalContext } from "../../../context/GlobalContext";

const GameContent = ({ size, ...props }) => {
    const {
        centerLetter,
        shuffledLetters,
        bonusLetter,
        answer,
        handleAllowedLetter,
        handleShuffle,
        handleEnter,
        handleDelete,
        score,
        correctWords,
        classes,
    } = props;

    const { setGameWidth, setGameOrientation } = useContext(GlobalContext);

    const slideDownContainerRef = useRef(null);

    const [showDropDown, setShowDropDown] = React.useState(false);

    const containerRatio = size.width / size.height;

    const verticalLayout =
        (containerRatio < 0.95 && size.width < 1500) ||
        (containerRatio < 1 && size.width < 1300) ||
        (containerRatio < 0.95 && size.width < 1000) ||
        (containerRatio < 0 && size.width < 700);

    const bestFitWidth = verticalLayout ? 440 : 900;
    const bestFitHeight = verticalLayout ? 1000 : 560;

    const [dropWidth, dropHeight] = useResizeObserver(
        slideDownContainerRef,
        [verticalLayout],
        "dropdown"
    );

    useEffect(() => {
        console.log("change layout", verticalLayout);
        setGameOrientation(verticalLayout ? "vertical" : "horizontal");
    }, [verticalLayout]);

    // console.log("VERITCAL?", verticalLayout);
    // console.log("dropWidth", dropWidth, dropHeight, slideDownContainerRef);

    const renderHorizontalContent = () => {
        return (
            <BestFit
                {...{
                    width: bestFitWidth,
                    height: bestFitHeight,
                    maxScale: 1.6,
                }}
                onScaleChange={({ scaleFactor, adaptWidth }) => {
                    const width = scaleFactor * adaptWidth;
                    setGameWidth(width);
                }}
            >
                <div
                    style={{
                        display: "flex",
                        height: "100%",
                        flexDirection: verticalLayout ? "column" : "row",
                    }}
                    className={`${verticalLayout ? classes.vertical : ""}`}
                >
                    <div className={classes.left}>
                        <div className={classes.inputWrapper}>
                            <AnswerInput value={answer} />
                        </div>

                        <div
                            style={{
                                height: "80%",
                                width: "100%",
                                padding: "40px 40px",
                                boxSizing: "border-box",
                            }}
                        >
                            <div
                                className={classes.lettersWrapper}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <BestFit
                                    {...{
                                        width: 300,
                                        height: 300,
                                        maxScale: 1.6,
                                    }}
                                >
                                    <LettersPanel
                                        center={centerLetter}
                                        letters={shuffledLetters}
                                        onLetterClick={handleAllowedLetter}
                                        bonusLetter={bonusLetter.toUpperCase()}
                                        answer={answer}
                                    />
                                </BestFit>
                            </div>
                        </div>
                        <div
                            style={{
                                height: "20%",
                                width: "70%",
                                margin: "auto",
                            }}
                        >
                            <FootButtons
                                onShuffle={handleShuffle}
                                onEnter={handleEnter}
                                onDelete={handleDelete}
                            />
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.rightInner}>
                            <ScoreTicker
                                className={classes.score}
                                score={score}
                            />
                            <CompletedWords
                                columns={4}
                                words={correctWords}
                                letterOrder={
                                    centerLetter + shuffledLetters.join("")
                                }
                                bonusLetter={bonusLetter}
                            />
                        </div>
                    </div>
                </div>
            </BestFit>
        );
    };
    const renderVerticalContent = () => {
        function createReversedArrayWithPadding(newLength, originalArray) {
            // Create a new array with the specified length filled with null
            let newArray = Array(newLength).fill(null);

            // Get the length of the original array
            let originalLength = originalArray.length;

            // Loop through the original array and place its elements in reverse order into the new array
            for (let i = 0; i < originalLength; i++) {
                if (i < newLength) {
                    newArray[newLength - 1 - i] = originalArray[i];
                }
            }

            return newArray;
        }

        function reverseEverySetOfThree(arr) {
            let length = arr.length;

            // Loop through the array in steps of 3
            for (let i = 0; i < length; i += 3) {
                // Reverse the set of 3 elements
                if (i + 2 < length) {
                    [arr[i], arr[i + 2]] = [arr[i + 2], arr[i]];
                }
            }

            return arr;
        }

        //

        const reverseCompletedWords = createReversedArrayWithPadding(
            12,
            correctWords
        );
        const resultArray = reverseEverySetOfThree(reverseCompletedWords);
        //  console.log("reverseCompletedWords", reverseCompletedWords);

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: verticalLayout ? "column" : "row",
                }}
                className={`${verticalLayout ? classes.vertical : ""}`}
            >
                {/* <AspectRatioBox ratio={540 / 150} style={{ backgroundColor: "black", minHeight: "25%" }}></AspectRatioBox> */}
                <div
                    style={{
                        width: "100%",
                        height: dropHeight * 0.32 + 45 + "px",
                        backgroundColor: "black",
                    }}
                ></div>
                <div className={classes.left}>
                    <ScoreTicker className={classes.score} score={score} />
                    <div className={classes.inputWrapper}>
                        <AnswerInput value={answer} />
                    </div>

                    <div
                        style={{
                            height: "70%",
                            width: "100%",
                            padding: "10px 20px",
                            boxSizing: "border-box",
                        }}
                    >
                        <div
                            className={classes.lettersWrapper}
                            style={{ height: "100%", width: "100%" }}
                        >
                            <BestFit
                                {...{ width: 300, height: 300, maxScale: 1.6 }}
                                style={{
                                    maxWidth: "430px",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                }}
                            >
                                <LettersPanel
                                    center={centerLetter}
                                    letters={shuffledLetters}
                                    onLetterClick={handleAllowedLetter}
                                    bonusLetter={bonusLetter.toUpperCase()}
                                    answer={answer}
                                />
                            </BestFit>
                        </div>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            flexGrow: 1,
                            height: "20%",
                            minHeight: "70px",
                            maxHeight: "120px",
                            marginTop: "auto",
                        }}
                    >
                        <BestFit
                            {...{ width: 270, height: 70, maxScale: 1.6 }}
                            style={{
                                maxWidth: "500px",
                                margin: "auto",
                                display: "flex",
                            }}
                        >
                            <FootButtons
                                onShuffle={handleShuffle}
                                onEnter={handleEnter}
                                onDelete={handleDelete}
                            />
                        </BestFit>
                    </div>
                </div>

                <div
                    className={`${classes.barrier} ${
                        showDropDown ? classes.showBarrier : ""
                    }`}
                    onTouchEnd={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setShowDropDown(false);
                    }}
                    onClick={() => {
                        setShowDropDown(false);
                    }}
                ></div>

                <div
                    ref={slideDownContainerRef}
                    className={`${classes.slideDownContainer} ${
                        showDropDown ? classes.showDropDown : ""
                    }`}
                    onTouchEnd={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        setShowDropDown(true);
                    }}
                    onClick={() => {
                        setShowDropDown(true);
                    }}
                >
                    <div className={classes.inner}>
                        <AspectRatioBox
                            ratio={520 / 620}
                            className={classes.slideRatioBox}
                        >
                            <BestFit
                                {...{
                                    width: 460,
                                    height: 500,
                                    maxScale: 3,
                                    style: { margin: "auto" },
                                }}
                            >
                                <CompletedWords
                                    columns={3}
                                    words={resultArray}
                                    letterOrder={
                                        centerLetter + shuffledLetters.join("")
                                    }
                                    bonusLetter={bonusLetter}
                                    rowClass={classes.verticalRow}
                                />
                            </BestFit>
                        </AspectRatioBox>
                    </div>

                    <div className={classes.sliderFooter}>
                        <div className={classes.sliderFooterInner}>
                            <div className={classes.toggleIconContainer}>
                                <img
                                    className={classes.toggleIcon}
                                    src={toggleIcon}
                                    style={{
                                        transform: showDropDown
                                            ? "rotate(180deg)"
                                            : "rotate(0deg)",
                                        transformOrigin: "50% 50%",
                                        transition: "transform 0.3s",
                                    }}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();

                                        setShowDropDown(!showDropDown);
                                    }}
                                    onTouchEnd={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();

                                        setShowDropDown(!showDropDown);
                                    }}
                                />
                            </div>

                            <div className={classes.progressContainer}>
                                <img
                                    className={classes.progressPanel}
                                    src={progressPanel}
                                />
                                <div className={classes.progressText}>
                                    {correctWords.length}/12
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {verticalLayout && renderVerticalContent()}
            {!verticalLayout && renderHorizontalContent()}
        </div>
    );
};
export default withSizeObserver(GameContent);
