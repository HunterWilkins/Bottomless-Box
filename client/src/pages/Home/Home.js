import React, {Component} from "react";
import "./style.css";

import Pocket from "../../components/Pocket";
import Item from "../../components/Item";
import Modal from "../../components/Modal";

class Home extends Component {
    state = {
        modal: false,
        itemName: "",
        itemVal: "",
        itemQty: "",
        itemId: "",
    }

    inventory = [
        {
            name: "Fried Chicken",
            value: 2.99,
            quantity: 4.0,
            id: 0
        }
    ]

    toggleModal = (infoObject) => {
        this.setState(
            {
                modal:!this.state.modal,
                itemName:infoObject.name,
                itemVal: infoObject.val,
                itemQty: infoObject.qty,
                inventory: []
            }
            );

        console.log(this.state);
    }
    
    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    };

    create = () => {
        alert("Function called!");
        let newItem = {
            name: this.state.itemName,
            value: this.state.itemVal,
            quantity: this.state.itemQty,
            id: this.inventory.length
        }

        this.inventory.push(newItem);
    }

    render(){
        return(
            <div id = "content">
                <Modal 
                    modal = {this.state.modal} 
                    itemName = {this.state.itemName}
                    itemVal = {this.state.itemVal}
                    itemQty = {this.state.itemQty} 
                    itemId = {this.state.itemId}
                    toggleModal = {this.toggleModal}
                    handleInputChange = {this.handleInputChange}
                    create = {this.create}
                />

                <div id = "dashboard">
                
                    <Pocket func = "add" toggleModal = {this.toggleModal}/>
                    
                </div>

                <div id = "inventory">
                    <h1>Inventory</h1>
                    <Item toggleModal = {this.toggleModal} name = "Name" value = "$Value" qty = "#"/>
                    {this.inventory.map(item =>{
                        return(
                            <Item toggleModal = {this.toggleModal}
                                name = {item.name}
                                value = {item.value}
                                qty = {item.quantity}
                                id = {item.id}
                            />
                        )
                    })}
                    <div id = "inv-buttons">
                        <button>Trash</button>
                        <button className = "symbol-btn"  onClick = {this.toggleModal}>+</button>
                        <button className = "symbol-btn">x</button>
                    </div>
                </div>     
            
            </div>
        )
    }
}

export default Home;