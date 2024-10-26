import classes from "./CompletedWords.module.css";
import HoneyWrapper from "./HoneyWrapper";
import {
    extendArray,
    splitArrayIntoChunks,
} from "../../../helpers/arrayHelpers";
import { GlobalContext } from "../../../context/GlobalContext";
import { useContext, useEffect, useState } from "react";

const CompletedWords = ({
    words,
    letterOrder,
    bonusLetter,
    columns = 4,
    rowClass = "",
    gameContext = "ingame",
}) => {
    const honeyObjects = extendArray(words, 12);
    const honeyObjectsChunks = splitArrayIntoChunks(honeyObjects, columns);

    const { gameOrientation } = useContext(GlobalContext);
    const [fontSize, setFontSize] = useState(19);

    const getFontSize = () => {
        let isCramped = false;
        for (var i = 0; i < words.length; i++) {
            const column = i % 4;
            if (column < 3) {
                const currWord = words[i].word;
                const nextWord = words[i + 1]?.word;

                if (
                    currWord.length >= 13 ||
                    (nextWord && currWord.length + nextWord.length >= 18)
                ) {
                    isCramped = true;
                    //   console.log(
                    //       "found a cramping",
                    //       words[i].word,
                    //       words[i + 1].word
                    //   );
                }
            }
        }
        // isCramped = false;

        if (gameContext === "ingame") return isCramped ? 19 : 23;
        if (gameContext === "post-game") return isCramped ? 15 : 18;
    };

    useEffect(() => {
        setFontSize(getFontSize());
    }, [words, gameContext, gameOrientation]);

    const maxWidth = gameContext === "ingame" ? 110 : 78;

    return (
        <div className={classes.root}>
            {honeyObjectsChunks.map((chunk, i) => {
                return (
                    <div
                        className={`${classes.row} ${rowClass}`}
                        key={"honey-row" + i}
                    >
                        {chunk.map((word, i) => {
                            // console.log("Render for word", i, word);
                            return (
                                <div
                                    className={classes.honeyWrapper}
                                    key={"honey-column" + i}
                                >
                                    <HoneyWrapper
                                        answer={word}
                                        fontSize={fontSize}
                                        letterOrder={letterOrder}
                                        bonusLetter={bonusLetter}
                                        maxWidth={maxWidth}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default CompletedWords;
