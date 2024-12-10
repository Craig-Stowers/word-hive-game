import React from "react";
import defaultClasses from "./AllStats.module.css";
import { splitArrayIntoChunks } from "../../../helpers/arrayHelpers";
import withSizeObserver from "../../withSizeObserver";

const AllStats = ({
    stats = [],
    isSmall = false,
    moduleOverride = {},
    size,
    columns,
}) => {
    const classes = {
        ...defaultClasses,
        ...moduleOverride,
    };
    const renderCell = ({ label, value }, index) => {
        return (
            <div className={classes.column} key={index}>
                <div className={classes.value}>{value}</div>
                <label> {label}</label>
            </div>
        );
    };

    let cols = columns ? columns : size.width < 500 ? 2 : 3;

    const statChunks = splitArrayIntoChunks(stats, cols);

    return (
        <div className={`${classes.root} ${isSmall ? classes.small : ""}`}>
            {statChunks.map((chunk, i) => {
                return (
                    <div className={classes.row} key={"stat-row" + i}>
                        {chunk.map((stat, j) => {
                            return renderCell(stat, j);
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default withSizeObserver(AllStats);
