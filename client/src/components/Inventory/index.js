import React from "react";
import "./style.css";
import Item from "../Item";
import {Link} from "react-router-dom";

function Inventory(props) {
    let filteredInv;

    if (props.invScreen === "All") {
        filteredInv = props.inventory;
    }
    else {
        filteredInv = props.inventory.filter(item => item.type === props.invScreen);
    }

    return(
    <div id = "inventory">
        <h1 id = "inv-title">{props.invScreen}</h1>
    
        <Item toggleModal = {props.toggleModal} type = "legend" name = "Name" value = "$" qty = "#"/>
        <div id = "items">
            {filteredInv.map(item =>{
                return(
                    <Item toggleModal = {() => {props.toggleModal("item", item)}}
                        name = {item.name}
                        value = {item.value}
                        qty = {item.quantity}
                        id = {item.id}
                        type = {item.type}
                    />
                );
            })}
        </div>
        
        <div id = "inv-buttons">
            <button  id = "trash" onClick = {() => {props.deletePocket()}}>
                <p>🗑</p>
            </button>
            <Link to="/info">
                <button id = "info">
                    <p>?</p>
                </button>
            </Link>
            <button id = "total" onClick = {() => {props.calcTotal()}}>
                <p>
                $
                </p>
            </button>
            <button id = "add-btn" className = "symbol-btn"  onClick = {() => {props.toggleModal("inventory", filteredInv)}} style = {{display: props.invScreen !== "All" ? "block" : "none"}}>
                <p>+</p>
            </button>
            {/* <button className = "symbol-btn">x</button> */}
        </div>
    
    </div>     
    )
    
}

export default Inventory;