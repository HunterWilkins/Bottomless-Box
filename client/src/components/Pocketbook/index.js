import React from "react";
import "./style.css";

import Pocket from "../Pocket";

function Pocketbook(props) {

    let availablePockets = props.pockets.map(item =>{
        return(
            <Pocket 
                name = {item}
                toggleInv = {props.toggleInv}
            />
        );
    })

    return (
        <div>
        <Pocket func = "add" toggleModal = {props.toggleModal} modalType = {props.modalType}/>
        {
            availablePockets
        }
        </div>
    );
}

export default Pocketbook;