import React from "react";
import "./style.css";

function Pocket(props) {

    if (props.func === "add") {
        return(
            <div className = "pocket" onClick = {() => {props.toggleModal("pocket", null)}}>
                <h1>+</h1>
            </div>
        )
    }
    else {
        return (
            <div className = "pocket">
                <img src = {"/images/" + props.name + ".png"} alt = "food"></img>
                <p>{props.name}</p>
            </div>
        );
        }
}

export default Pocket;