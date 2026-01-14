import React from "react";

export default function NoDataMessage(props){
    return(
        <div className={"outerDiv"}>
            <div className={"innerDiv"}>
                <p className={"messageContent"}>This is {props.message} Page </p>
            </div>
        </div>
    )
}