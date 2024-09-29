import React, { useEffect, useState } from "react";
import classes from "./Feedback.module.css";

import CompletedWords from "../game/CompletedWords";
import ScoreBars from "./ScoreBars";
import AllStats from "../stats/AllStats";
import allStatsClasses from "./AllStatsFeedback.module.css";
import getScores from "../../getScores";
import CustomButton from "../../../shared/CustomButton";
import CloseIcon from "../../../assets/icons/icon-close.svg?react";
import buttonClasses from "../../layouts/Buttons.module.css";
import withSizeObserver from "../../withSizeObserver";

const Feedback = ({ size, screen }) => {
    const daysElapsed = screen.globalData.daysElapsed;
    const [tabSelection, setTabSelection] = useState("gamestats");
    const [answers, setAnswers] = useState([]);
    const [barData, setBarData] = useState([
        {
            label: "4",
            value: 0,
        },
        {
            label: "5",
            value: 0,
        },
        {
            label: "6",
            value: 0,
        },
        {
            label: "+7",
            value: 0,
        },
    ]);

    const [played, solved, streak, pangrams, avgScore, highScore] = getScores(
        screen.globalData.localData
    );

    // console.log("test scores", [played, solved, streak, pangrams, avgScore, highScore]);

    const containerRatio = size.width / size.height;

    const verticalLayout =
        (containerRatio < 0.95 && size.width < 1500) ||
        (containerRatio < 1 && size.width < 1300) ||
        (containerRatio < 0.95 && size.width < 1000) ||
        (containerRatio < 0 && size.width < 700);

    const bestFitWidth = verticalLayout ? 440 : 900;
    const bestFitHeight = verticalLayout ? 1000 : 560;

    //  const buttonStyle={{width:"60px", height:"60px"}}
    useEffect(() => {
        const loadAnswers = () => {
            const answers =
                screen.globalData.localData.success[
                    screen.globalData.daysElapsed
                ].correct;

            // console.log("answers", answers);

            if (!answers) return;

            // console.log("answers", answers);

            setAnswers(answers);

            const fours = answers.filter((v) => v.word.length === 4).length;
            const fives = answers.filter((v) => v.word.length === 5).length;
            const sixes = answers.filter((v) => v.word.length === 6).length;
            const sevens = answers.filter((v) => v.word.length >= 7).length;

            setBarData([
                {
                    label: "4",
                    value: fours,
                },
                {
                    label: "5",
                    value: fives,
                },
                {
                    label: "6",
                    value: sixes,
                },
                {
                    label: "+7",
                    value: sevens,
                },
            ]);
        };

        // const timer = setTimeout(() => {
        loadAnswers();
        // }, 100);

        // return () => clearTimeout(timer);
    }, [screen.globalData.daysElapsed, screen.globalData.localData]);

    function getSmallestWord(words) {
        if (words.length === 0) {
            return null; // or any appropriate value for empty array case
        }

        let smallestWord = words[0];

        for (let i = 1; i < words.length; i++) {
            if (words[i].length < smallestWord.length) {
                smallestWord = words[i];
            }
        }

        return smallestWord;
    }

    const score = screen.globalData.localData.success[daysElapsed]?.score;

    const allPangrams = screen.globalData.currChallengeData?.pangrams;

    const selectedPangram = getSmallestWord(allPangrams);

    if (!score) return;

    const getScoreMessageForRange = (score) => {
        if (score < 50) {
            return "Good!";
        } else if (score < 100) {
            return "Very good!";
        } else if (score < 150) {
            return "Brilliant!";
        } else {
            return "Genius!";
        }
    };

    const scoreMessage = getScoreMessageForRange(score);

    const renderHorizontalContent = () => {
        return (
            <div className={classes.root}>
                {/* <div className={classes.buttonRow}>
                    <div className={classes.closeContainer}>
                        <CustomButton
                            className={`${buttonClasses.close}`}
                            render={() => <CloseIcon />}
                            onClick={() => screen.actions.close()}
                        />
                    </div>
                </div> */}
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <div className={classes.column1}>
                            <div
                                className={`${classes.panel} ${classes.panel1}`}
                            >
                                <div className={classes.scoreText}>
                                    SCORE{" "}
                                    <span>
                                        {
                                            screen.globalData.localData.success[
                                                daysElapsed
                                            ].score
                                        }
                                    </span>
                                </div>
                                <div className={classes.message}>
                                    {scoreMessage}
                                </div>
                            </div>
                            <div
                                className={`${classes.panel} ${classes.panel2}`}
                            >
                                <h2>YOUR WORDS</h2>
                                <CompletedWords words={answers} />
                            </div>
                        </div>

                        <div className={classes.column2}>
                            <div
                                className={`${classes.panel} ${classes.panel1}`}
                            >
                                <div className={classes.source}>
                                    Source word: <span>{selectedPangram}</span>
                                </div>
                            </div>
                            <div
                                className={`${classes.panel} ${classes.panel2}`}
                            >
                                <h2>LETTERS</h2>
                                <ScoreBars highlight={null} stats={barData} />
                            </div>
                            <div
                                className={`${classes.panel} ${classes.panel3}`}
                            >
                                <h2>ALL GAMES</h2>
                                <div className={`${classes.allStatsContainer}`}>
                                    <AllStats
                                        moduleOverride={allStatsClasses}
                                        columns={3}
                                        stats={[
                                            {
                                                label: "Played",
                                                value: played,
                                            },
                                            {
                                                label: "Solved",
                                                value: solved,
                                            },
                                            {
                                                label: "Streak",
                                                value: streak,
                                            },
                                            {
                                                label: "Pangrams",
                                                value: pangrams,
                                            },
                                            {
                                                label: "Avg. score",
                                                value: avgScore,
                                            },
                                            {
                                                label: "High score",
                                                value: highScore,
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderVerticalContent = () => {
        const renderAllStats = () => {
            return (
                <div className={`${classes.panel} ${classes.panel3}`}>
                    <div className={`${classes.allStatsContainer}`}>
                        <AllStats
                            isSmall={true}
                            moduleOverride={allStatsClasses}
                            columns={2}
                            stats={[
                                {
                                    label: "Played",
                                    value: played,
                                },
                                {
                                    label: "Solved",
                                    value: solved,
                                },
                                {
                                    label: "Streak",
                                    value: streak,
                                },
                                {
                                    label: "Pangrams",
                                    value: pangrams,
                                },
                                {
                                    label: "Avg. score",
                                    value: avgScore,
                                },
                                {
                                    label: "High score",
                                    value: highScore,
                                },
                            ]}
                        />
                    </div>
                </div>
            );
        };

        const renderGameStats = () => {
            return (
                <>
                    <div className={`${classes.panel} ${classes.panel2}`}>
                        <div className={classes.scoreContainer}>
                            <div className={classes.scoreText}>
                                SCORE{" "}
                                <span>
                                    {
                                        screen.globalData.localData.success[
                                            daysElapsed
                                        ].score
                                    }
                                </span>
                            </div>
                            <div className={classes.message}>
                                {scoreMessage}
                            </div>
                        </div>
                    </div>
                    <div className={`${classes.panel} ${classes.panel2}`}>
                        <div className={classes.source}>
                            Source word: <span>{selectedPangram}</span>
                        </div>
                    </div>
                    <div
                        className={`${classes.panel} ${classes.panel2} ${classes.wordListContainer}`}
                    >
                        <h2>YOUR WORDS</h2>

                        <div className={classes.wordList}>
                            {answers.map((word, i) => {
                                return (
                                    <div
                                        key={"word" + i}
                                        className={classes.word}
                                        style={{
                                            width: "33%",
                                            display: "inline-block",
                                            textAlign: "center",
                                        }}
                                    >
                                        {word.word}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={`${classes.panel} ${classes.panel2}`}>
                        <h2>LETTERS</h2>
                        <div className={classes.panelContent}>
                            <ScoreBars highlight={null} stats={barData} />
                        </div>
                    </div>
                </>
            );
        };

        return (
            <div className={`${classes.root} ${classes.vertical}`}>
                {/* <div className={classes.buttonRow}>
                    <div className={classes.closeContainer}>
                        <CustomButton
                            className={`${buttonClasses.close}`}
                            render={() => <CloseIcon />}
                            onClick={() => screen.actions.close()}
                        />
                    </div>
                </div> */}

                <div className={classes.inner}>
                    <div className={`${classes.content}`}>
                        <div className={classes.tabs}>
                            <div className={classes.tabContainer}>
                                <div
                                    className={`${classes.topAngledCorners} ${
                                        classes.tab
                                    } ${
                                        tabSelection === "gamestats"
                                            ? classes.selected
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setTabSelection("gamestats");
                                    }}
                                >
                                    GAME STATS
                                </div>
                            </div>
                            <div className={classes.tabContainer}>
                                <div
                                    className={`${classes.topAngledCorners} ${
                                        classes.tab
                                    } ${
                                        tabSelection === "alltime"
                                            ? classes.selected
                                            : ""
                                    }`}
                                    onClick={() => {
                                        setTabSelection("alltime");
                                    }}
                                >
                                    ALL TIME STATS
                                </div>
                            </div>
                        </div>
                        {tabSelection === "gamestats"
                            ? renderGameStats()
                            : renderAllStats()}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {verticalLayout
                ? renderVerticalContent()
                : renderHorizontalContent()}
        </>
    );
};

export default withSizeObserver(Feedback);
