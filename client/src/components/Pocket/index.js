import React from "react";
import "./style.css";

function Pocket(props) {

    let styles = {
        background: "url('/images/" + props.name + ".png')"
    }

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

    else if (props.name === "All") {
        return (
            <div className = "pocket" style = {styles} onClick = {() => {props.toggleInv(props.name)}}>
                <h2>All</h2>
            </div>
        );
    }

    else {
        return (
            <div className = "pocket" style = {styles} onClick = {() => {props.toggleInv(props.name)}}>
            </div>
        );
    }

}

export default Pocket;