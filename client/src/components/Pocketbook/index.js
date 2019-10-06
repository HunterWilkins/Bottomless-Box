import React from "react";
import "./style.css";

import Pocket from "../Pocket";

function Pocketbook(props) {

    let styles = {
        border: "rgb(103, 90, 75) solid 2px"
    }

    return (
        <div id = "dashboard">
            <Pocket func = "add" toggleModal = {props.toggleModal} modalType = {props.modalType}/>
            
            <Pocket func = "pocket" name = "All" toggleInv = {props.toggleInv} modalType = {props.modalType}/>
            {
                props.pockets.map(item => {
                    return(
                        <Pocket
                        name = {item}
                        toggleInv = {props.toggleInv}
                        activeStyle = {styles}
                        pocket = {props.pocket}
                        style = {props.pocket === item ? styles : {}}
                        />
                    )
                })
            }
        </div>
    );
}

export default Pocketbook;