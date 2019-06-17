import React from "react";
import "./style.css";

function Item(props) {

    let infoObject = {
        name: props.name,
        val: props.value,
        qty: props.qty,
        id: props.id
    }
    
    return (
        <div className = "item" onClick = {() => props.toggleModal("item", infoObject)}>
            <p className = "item-name">{props.name}</p>
            <p className = "item-value">{props.value}</p>
            <p className = "item-qty">{props.qty}</p>
        </div>
    );
}

export default Item;