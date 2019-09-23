import React from "react";
import "./style.css";
import Item from "../Item";
import {Link} from "react-router-dom";

function Inventory(props) {
    let filteredInv;

    let total;

    if (props.invScreen === "All") {
        filteredInv = props.inventory;
    }
    else {
        filteredInv = props.inventory.filter(item => item.type === props.invScreen);
    }

    calcTotal();
    function calcTotal() {
        total = 0;
        filteredInv.forEach(function(item){
            total += parseFloat(item.value) * parseFloat(item.quantity);
        });
        total = total.toFixed(2);
    }
    


    return(
    <div id = "inventory">
        <h3 id = "inv-title">{props.invScreen}</h3>
        <p id = "inv-total">${total}</p>
    
        <Item toggleModal = {props.toggleModal} type = "legend" name = "Name" value = "$" qty = "#" total = "Total"/>
        <div id = "items">
            {filteredInv.map(item =>{
                return(
                    <Item toggleModal = {() => {props.toggleModal("item", item)}}
                        name = {item.name}
                        value = {item.value}
                        qty = {item.quantity}
                        id = {item.id}
                        type = {item.type}
                        total = {parseFloat(item.quantity) * parseFloat(item.value)}
                    />
                );
            })}
        </div>
        {/* <div id = "item-total">
            <p id = "item-total-title">Totals</p>
            <p id = "item-total-val">{props.total}</p>
            <p id = "item-total-qty"></p>
        </div> */}

        
        <div id = "inv-buttons">
            <button  id = "trash" onClick = {() => {props.deletePocket()}}>
                <p>🗑</p>
            </button>
            <Link id = "info" to = "info">                    
                    <p>?</p>
            </Link>

            <button id = "settings" onClick = {() => {props.toggleModal("settings", null)}}>
                <p>
                ⚙
                </p>
            </button>
            <button id = "add-btn" className = "symbol-btn"  onClick = {() => {props.toggleModal("inventory", filteredInv)}} style = {{display: props.invScreen !== "All" ? "inline-block" : "none"}}>
                <p>+</p>
            </button>
            {/* <button className = "symbol-btn">x</button> */}
        </div>
    
    </div>     
    )
    
}

export default Inventory;