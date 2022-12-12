import React from "react";

function Popup({ children, close }) {
    return (
        <div className=" fixed top-0 left-0 z-50 flex  h-screen w-full ">
            <div
                className=" absolute h-screen w-full cursor-pointer bg-black bg-opacity-80"
                onClick={() => close(false)}
            ></div>
            <div className=" z-50">{children}</div>
        </div>
    );
}

export default Popup;
