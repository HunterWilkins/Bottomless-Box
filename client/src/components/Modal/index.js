import React from "react";
import "./style.css";
import Pocket from "../Pocket";

function Modal(props) {

    let isShoppingStyle = {}

    if (props.shopping === true) {
        isShoppingStyle = {    
            background: "rgb(103, 73, 64)",
            border: "rgb(216, 180, 152) solid 2px",
        }
    }

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
                <button id = "pocketbook-close" className = "modal-close modal-button" onClick = {() => {props.toggleModal("pocket", null)}}>
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
                
                <div className = "modal-button" id = "isShopping" style = {isShoppingStyle} onClick = {() => {props.toggleShopping()}}>
                    <p>
                        🛒
                    </p>
                </div>        

                <input onChange = {props.handleInputChange} name = "itemVal" id = "modal-value" type = "number" placeholder = {props.itemVal} ></input>

                <div id = "qty-editors-div">
                    <input onChange = {props.handleInputChange} name = "itemQty" id = "modal-qty" type = "number" placeholder = {props.itemQty} ></input>
                    <div id = "qty-buttons">
                        <div className = "qty-editor modal-button" id = "addition-btn" onClick = {() => {props.addQty()}}>
                        <p>
                            +
                        </p>
                        </div>
                        
                        <div className = "qty-editor modal-button" onClick = {() => {props.subQty()}}>
                        <p>
                            -
                        </p>
                        </div>
                    </div>
                </div>
        
                <div className = "modal-button" id = "modal-submit" onClick = {props.create}>
                    <p>Submit</p>
                </div>
                <div className = "modal-close modal-button" onClick = {() => {props.toggleModal("inventory", null)}}>
                    <p>
                        X
                    </p>
                </div>
                <div className = "modal-button" id = "modal-trash" onClick = {() => {props.delete()}}>
                    <p>
                    🗑
                    </p>
                </div>
                
            </div>
            </div>
        );
    }

    else if (props.type === "inventory") {
        return (
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>

                
            <div id = "modal" val = {props.itemId}>
            <p className = "modal-title">New {props.pocket} Item</p>

                <input onChange = {props.handleInputChange}  name = "itemName" id = "modal-name" type = "text" placeholder = "Item Name"></input>
                <input onChange = {props.handleInputChange}  name = "itemVal" id = "modal-value" type = "number" placeholder = "Price ($)" ></input>
                <input onChange = {props.handleInputChange}  name = "itemQty" id = "modal-qty" type = "number" placeholder = "Quantity" ></input>
                {/* <button className = "qty-editor" onClick = {() => {props.addQty()}}>+</button>
                <button className = "qty-editor" onClick = {() => {props.subQty()}}>-</button> */}
                
                <div className = "modal-button" id = "isShopping" style = {isShoppingStyle} onClick = {() => {props.toggleShopping()}}>
                    <p>
                        🛒
                    </p>
                </div>        
                
                <div id = "modal-submit" className = "modal-button" onClick = {props.create}>                    
                    <p>Submit</p>
                </div>
                <div className = "modal-close modal-button" onClick = {() => {props.toggleModal("inventory", null)}}>
                    <p>
                    X
                    </p>
                </div>
                <div id = "modal-trash" className = "modal-button" onClick = {() => {props.delete()}}>
                    <p>
                    🗑
                    </p>
                </div>
                
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

    else if (props.type === "magna carta") {
        return (
            <div id = "backdrop" style = {{display: props.modal ? "block" : "none"}}>

                
            <div id = "modal" val = {props.itemId}>
            <p className = "modal-title">~ Sales Tax ~</p>

                <input onChange = {props.handleInputChange}  name = "tax" id = "modal-name" type = "number" placeholder = {props.tax ? `${props.tax}%` : `0.00%`}></input>
                {/* <button className = "qty-editor" onClick = {() => {props.addQty()}}>+</button>
                <button className = "qty-editor" onClick = {() => {props.subQty()}}>-</button> */}    
                
                <div id = "modal-submit-tax" className = "modal-button" onClick = {() => {props.updateTax()}}>                    
                    <p>Submit</p>
                </div>

                <div className = "modal-close modal-button" onClick = {() => {props.toggleModal("inventory", null)}}>
                    <p>
                    X
                    </p>
                </div>
                
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