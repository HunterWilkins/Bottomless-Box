import React from "react";
import "./style.css";

function Pocket(props) {

    if (props.func === "add") {
        return(
            <div className = "pocket" onClick = {props.toggleModal}>
                <h1>+</h1>
            </div>
        )
    }
    return (
        <div className = "pocket">
            <h1>This is a pocket.</h1>
        </div>
    );
}

export default Pocket;