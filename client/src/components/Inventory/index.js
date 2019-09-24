import React from "react";
import "./style.css";
import Item from "../Item";
import {Link} from "react-router-dom";

function Inventory(props) {
    let filteredInv;

    let isActive = {}

    if (props.shoppingList) {
        isActive = {
            background: "rgb(47, 29, 22)",
            border: "rgb(125, 78, 60) solid 2px"
        }
    }

    let total;

    if (props.invScreen === "All" && props.shoppingList !== true) {
        filteredInv = props.inventory.filter(item => !item.shopping);
    }

    else if (props.invScreen === "All" && props.shoppingList) {
        filteredInv = props.inventory.filter(item => item.shopping === true);
    }

    else if (props.shoppingList === true) {
        filteredInv = props.inventory.filter(item => item.shopping === true && item.type === props.invScreen);
    }

    else {
        filteredInv = props.inventory.filter(item => item.type === props.invScreen && !item.shopping);
    }

    calcTotal();
    function calcTotal() {
        total = 0;
        filteredInv.forEach(function(item){
            total += parseFloat(item.value) * parseFloat(item.quantity);
        });
        total = parseFloat(total.toFixed(2));
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
                        total = {parseFloat(parseFloat(item.quantity) * parseFloat(item.value)).toFixed(2)}
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
            <div id = "add-btn" className = "symbol-btn"  onClick = {() => {props.toggleModal("inventory", filteredInv)}} style = {{display: props.invScreen !== "All" ? "inline-block" : "none"}}>
                <p>+</p>
            </div>

            <div  id = "trash" onClick = {() => {props.deletePocket()}}>
                <p>🗑</p>
            </div>
            <Link id = "info" to = "info">                    
                    <p>?</p>
            </Link>

            <div id = "toggle-shopping-list" style = {isActive} onClick = {() => {props.toggleShoppingList()}}>
                <p>
                    🛒
                </p>
            </div>

            <div id = "settings" onClick = {() => {props.toggleModal("settings", null)}}>
                <p>
                ⚙
                </p>
            </div>

            {/* <button className = "symbol-btn">x</button> */}
        </div>
    
    </div>     
    )
    
}

export default Inventory;