import Header from "../shared/Header";
const WithHeader = ({ children, ...props }) => {
    return (
        <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
            <Header {...props} />
            <div style={{ flexGrow: 1, overflow: "hidden" }}>{children}</div>
        </div>
    );
};

export default WithHeader;
