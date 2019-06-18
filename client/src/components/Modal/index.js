import React from "react";
import "./style.css";
import Pocket from "../Pocket";

function Modal(props) {

    if (props.type === "pocket"){
        return(
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>
                
            <div id = "modal">
                <Pocket func = "modal" name = "Food" makePocket = {props.makePocket}/>
                <Pocket func = "modal" name = "Fruit"  makePocket = {props.makePocket}/>
                <Pocket func = "modal" name = "Vegetables" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Junk Food" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Medicine" makePocket = {props.makePocket} />
                <button id = "modal-close" onClick = {() => {props.toggleModal("pocket", null)}}>X</button>
            </div>
            </div>
        )
    }

    else if (props.type === "item") {
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
                <button id = "modal-trash" onClick = {props.delete}>🗑</button>
                
            </div>
            </div>
        );
    }

    else if (props.type === "inventory") {
        return (
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>
                
            <div id = "modal" val = {props.itemId}>
                <input onChange = {props.handleInputChange} name = "itemName" id = "modal-name" type = "text" placeholder = {props.itemName}></input>
                <input onChange = {props.handleInputChange} name = "itemVal" id = "modal-value" type = "text" placeholder = {props.itemVal}></input>
                <input onChange = {props.handleInputChange} name = "itemQty" id = "modal-qty" type = "text" placeholder = {props.itemQty} ></input>
                <button className = "qty-editor">+</button>
                <button className = "qty-editor">-</button>
                <button id = "modal-submit" onClick = {props.create}>Submit</button>
                <button id = "modal-close" onClick = {() => {props.toggleModal("inventory")}}>X</button>
                <button id = "modal-trash" onClick = {props.delete}>🗑</button>
                
            </div>
            </div>
        );
    }
    else {
        return(
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}} />
        )
    }
    
}

export default Modal;