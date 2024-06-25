import React, { useEffect, useState, useRef } from "react";

export default function ScoreTicker({ className, score }) {
    const scoreRef = useRef(score);
    const [renderScore, setRenderScore] = useState(score);

    useEffect(() => {
        let timer = null;
        const diff = score - scoreRef.current;
        const interval = 200 / Math.pow(diff, 0.8);

        timer = setInterval(() => {
            if (scoreRef.current < score) {
                scoreRef.current = scoreRef.current + 1;
                setRenderScore(scoreRef.current);
            } else {
                clearInterval(timer);
            }
        }, interval);
        return () => clearInterval(timer);
    }, [score]);

    const scoreChars = String(renderScore).split("");

    return (
        <div className={className}>
            SCORE:{" "}
            <span>
                {scoreChars.map((e, index) => (
                    <span key={"char" + index} style={{ width: "20px" }}>
                        {e}
                    </span>
                ))}
            </span>
        </div>
    );
}
