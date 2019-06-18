import React from "react";
// import "./style.css";
import Item from "../Item";

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
        <h1>{props.invScreen}</h1>
    
        <Item toggleModal = {props.toggleModal} name = "Name" value = "$" qty = "#"/>
        {filteredInv.map(item =>{
            return(
                <Item toggleModal = {props.toggleModal}
                    name = {item.name}
                    value = {item.value}
                    qty = {item.quantity}
                    id = {item.id}
                    type = {item.type}
                />
            );
        })}
    
        <div id = "inv-buttons">
            <button onClick = {props.deletePocket}>Trash</button>
            <button className = "symbol-btn"  onClick = {() => {props.toggleModal("inventory")}} style = {{display: props.invScreen !== "All" ? "block" : "none"}}>+</button>
            <button className = "symbol-btn">x</button>
        </div>
    
    </div>     
    )
    
}

export default Inventory;