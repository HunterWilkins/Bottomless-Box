import React from "react";
import "./style.css";
import Pocket from "../Pocket";

function Modal(props) {

    if (props.type === "pocket"){
        return(
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>
                
            <div id = "modal">
                <p className = "modal-title">~ Create a Pocket ~</p>
                <div id = "pocketbook-field">
                <Pocket func = "modal" name = "Food" makePocket = {props.makePocket}/>
                <Pocket func = "modal" name = "Fruit"  makePocket = {props.makePocket}/>
                <Pocket func = "modal" name = "Vegetables" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Junk Food" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Drinks" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Medicine" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Electronics" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Pet Supplies" makePocket = {props.makePocket} />
                <Pocket func = "modal" name = "Misc" makePocket = {props.makePocket} />
                </div>
                <button className = "modal-close" onClick = {() => {props.toggleModal("pocket", null)}}>
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
            <p className = "modal-title">~ Edit Item ~</p>
                <input onChange = {props.handleInputChange} name = "itemName" id = "modal-name" type = "text" placeholder = {props.itemName}></input>
                <input onChange = {props.handleInputChange} name = "itemVal" id = "modal-value" type = "number" placeholder = {props.itemVal} ></input>
                <div id = "qty-editors-div">
                <input onChange = {props.handleInputChange} name = "itemQty" id = "modal-qty" type = "number" placeholder = {props.itemQty} ></input>
                <div id = "qty-buttons">
                    <button className = "qty-editor" id = "addition-btn" onClick = {() => {props.addQty()}}>
                    <p>
                        +
                    </p>
                    </button>
                    
                    <button className = "qty-editor" onClick = {() => {props.subQty()}}>
                    <p>
                        -
                    </p>
                    </button>
                </div>
                </div>
        
                <button id = "modal-submit" onClick = {props.create}>
                    <p>Submit</p>
                </button>
                <button className = "modal-close" onClick = {() => {props.toggleModal("inventory", null)}}>
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
            <p className = "modal-title">~ New Item ~</p>

                <input onChange = {props.handleInputChange}  name = "itemName" id = "modal-name" type = "text" placeholder = "Item Name"></input>
                <input onChange = {props.handleInputChange}  name = "itemVal" id = "modal-value" type = "number" placeholder = "Price ($)" ></input>
                <input onChange = {props.handleInputChange}  name = "itemQty" id = "modal-qty" type = "number" placeholder = "Quantity" ></input>
                {/* <button className = "qty-editor" onClick = {() => {props.addQty()}}>+</button>
                <button className = "qty-editor" onClick = {() => {props.subQty()}}>-</button> */}
                <button id = "modal-submit" onClick = {props.create}>                    
                    <p>Submit</p>
                </button>
                <button className = "modal-close" onClick = {() => {props.toggleModal("inventory", null)}}>
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

    else if (props.type === "settings") {
        return(
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}} >
                <div id = "modal">
                    <h1>Settings</h1>
                    <h2>Color Scheme</h2>
                    <button>Blue</button>
                    <button>Brown</button>
                    <button>Green</button>
                    <button>Gray</button>
                    <button className = "modal-close" onClick = {() => {props.toggleModal("inventory", null)}} >
                        <p>X</p>
                    </button>
                </div>
            </div>
            
        )
    }

    else {
        return(
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}} />
        )
    }
    
}

export default Modal;