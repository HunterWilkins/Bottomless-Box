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
                <Pocket func = "modal" name = "Misc" makePocket = {props.makePocket} />
                <button id = "modal-close" onClick = {() => {props.toggleModal("pocket", null)}}>
                    <p>
                    X
                    </p>
                </button>
            </div>
            </div>
        )
    }

    else if (props.type === "item") {
        return (
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>
                
            <div id = "modal" val = {props.itemId}>
                <input onChange = {props.handleInputChange} name = "itemName" id = "modal-name" type = "text" placeholder = {props.itemName}></input>
                <input onChange = {props.handleInputChange} name = "itemVal" id = "modal-value" type = "number" placeholder = {props.itemVal} ></input>
                <input onChange = {props.handleInputChange} name = "itemQty" id = "modal-qty" type = "number" placeholder = {props.itemQty} ></input>
                <button className = "qty-editor" onClick = {() => {props.addQty()}}>
                    <p>
                        +
                    </p>
                    </button>
                <button className = "qty-editor" onClick = {() => {props.subQty()}}>
                    <p>
                        -
                    </p>
                    </button>
                <button id = "modal-submit" onClick = {props.create}>Submit</button>
                <button id = "modal-close" onClick = {() => {props.toggleModal("inventory", null)}}>
                    <p>
                        X
                    </p>
                </button>
                <button id = "modal-trash" onClick = {() => {props.delete()}}>
                    <p>
                    🗑
                    </p>
                </button>
                
            </div>
            </div>
        );
    }

    else if (props.type === "inventory") {
        return (
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>
                
            <div id = "modal" val = {props.itemId}>
                <input onChange = {props.handleInputChange}  name = "itemName" id = "modal-name" type = "text" placeholder = "Item Name"></input>
                <input onChange = {props.handleInputChange}  name = "itemVal" id = "modal-value" type = "number" placeholder = "Price ($)" ></input>
                <input onChange = {props.handleInputChange}  name = "itemQty" id = "modal-qty" type = "number" placeholder = "Quantity" ></input>
                <button className = "qty-editor" onClick = {() => {props.addQty()}}>+</button>
                <button className = "qty-editor" onClick = {() => {props.subQty()}}>-</button>
                <button id = "modal-submit" onClick = {props.create}>Submit</button>
                <button id = "modal-close" onClick = {() => {props.toggleModal("inventory", null)}}>
                    <p>
                    X
                    </p>
                </button>
                <button id = "modal-trash" onClick = {() => {props.delete()}}>
                    <p>
                    🗑
                    </p>
                    </button>
                
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