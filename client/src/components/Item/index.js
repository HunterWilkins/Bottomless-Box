import React from "react";
import "./style.css";

function Item(props) {

    let infoObject = {
        name: props.name,
        val: props.value,
        qty: props.qty,
        id: props.id
    }

    if (props.type === "legend"){
        return(
            <div className = "item-legend">
                <p className = "item-name">{props.name}</p>
                <p className = "item-value">{props.value}</p>
                <p className = "item-qty">{props.qty}</p>
                <p className = "item-total">{props.total}</p>
            </div>
        )
    }

    else {
        return (
            <div className = "item" onClick = {props.toggleModal}>
                <p className = "item-name">{props.name}</p>
                <p className = "item-value"><span className = "half-opacity">$</span>{props.value}</p>
                <p className = "item-qty">{props.qty}</p>
                <p className = "item-total"><span className = "half-opacity">$</span>{props.total}</p>
            </div>
        );
    }
    
}

export default Item;