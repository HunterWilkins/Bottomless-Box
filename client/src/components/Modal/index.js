import React from "react";
import "./style.css";

function Modal(props) {

    return (
        <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>
            
        <div id = "modal" val = {props.itemId}>
            <input onChange = {props.handleInputChange} name = "itemName" id = "modal-name" type = "text" placeholder = {props.itemName}></input>
            <input onChange = {props.handleInputChange} name = "itemVal" id = "modal-value" type = "text" placeholder = {props.itemVal}></input>
            <input onChange = {props.handleInputChange} name = "itemQty" id = "modal-qty" type = "text" placeholder = {props.itemQty} ></input>
            <button className = "qty-editor">+</button>
            <button className = "qty-editor">-</button>
            <button id = "modal-submit" onClick = {props.create}>Submit</button>
            <button id = "modal-close" onClick = {props.toggleModal}>X</button>
            <button id = "modal-trash">🗑</button>
            
        </div>
        </div>
    );
}

export default Modal;