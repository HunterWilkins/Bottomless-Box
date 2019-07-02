import React from "react";
import "./style.css";

import Pocket from "../Pocket";

function Pocketbook(props) {

    return (
        <div id = "dashboard">
        <Pocket func = "add" toggleModal = {props.toggleModal} modalType = {props.modalType}/>
        <Pocket name = "All" toggleInv = {props.toggleInv} modalType = {props.modalType}/>
        {
            props.pockets.map(item => {
                return(
                    <Pocket
                    name = {item}
                    toggleInv = {props.toggleInv}
                    />
                )
            })
        }
        </div>
    );
}

export default Pocketbook;