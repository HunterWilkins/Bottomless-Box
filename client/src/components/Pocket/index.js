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

    else if (props.func === "modal") {
        return (
            <div className = "pocket" onClick = {() => {props.makePocket(props.name)}}>
                <img src = {"/images/" + props.name + ".png"} alt = "food"></img>
                <p>{props.name}</p>
            </div>
        );
    }

    else {
        return (
            <div className = "pocket" onClick = {() => {props.toggleInv(props.name)}}>
                <img src = {"/images/" + props.name + ".png"} alt = {props.name}></img>
            </div>
        );
    }

}

export default Pocket;