import React, {Component} from "react";
import "./style.css";

import Pocket from "../../components/Pocket";
import Item from "../../components/Item";
import Modal from "../../components/Modal";

class Home extends Component {
    state = {
        modal: false,
        modalType: "",
        itemName: "",
        itemVal: "",
        itemQty: "",
        itemId: "",
    }

    inventory = [];

    updateStorage = () => {
        localStorage.setItem("inventory", JSON.stringify(this.inventory));
    }
    
    componentWillMount = () => {
        let localInv = JSON.parse(localStorage.getItem("inventory"));
        if (localInv){
            localInv.forEach(item => {
                this.inventory.push(item);
            });
        }
    }
    
    toggleModal = (type, infoObject ) => {
        this.setState({modal:!this.state.modal});

        if (type === "pocket"){
            this.setState(
                {
                    modalType:"pocket"
                }
            );
        }
        else if (type === "item") {
            this.setState({
                itemName: infoObject.name,
                itemVal: infoObject.val,
                itemQty: infoObject.qty,
                itemId: infoObject.id
            })
        }
    }
    
    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    };

    create = () => {
        let repeat;

        this.toggleModal();

        this.inventory.forEach(item => {
            if (item.id === this.state.itemId) {
                repeat = true;
            }
        })

        if (!repeat) {
            let newItem = {
                name: this.state.itemName,
                value: this.state.itemVal,
                quantity: this.state.itemQty,
                id: this.inventory.length
            }
            

            this.inventory.push(newItem);
            this.updateStorage();
        }
        else {
            this.update(this.state.itemId);
        }
        
    }

    update = (id) => {
        this.inventory.forEach(item => {
            if (item.id === id){
                item.name = this.state.itemName;
                item.value = this.state.itemVal;
                item.quantity = this.state.itemQty;
            }
        });

        this.updateStorage();
    };

    delete = () => {
        this.inventory.forEach(item => {
            
            if (item.id === this.state.itemId) {
                let deletionIndex = this.inventory.indexOf(item);
                console.log(this.inventory[deletionIndex]);

                this.inventory.splice(this.inventory[deletionIndex]);
                this.updateStorage();
            }
        });

        this.toggleModal();
    };

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
                    delete = {this.delete}

                    type = {this.state.modalType}
                />

                <div id = "dashboard">
                
                    <Pocket func = "add" toggleModal = {this.toggleModal} modalType = {this.state.modalType}/>
                    
                </div>

                <div id = "inventory">
                    <h1>Inventory</h1>
                    <Item toggleModal = {this.toggleModal} name = "Name" value = "$" qty = "#"/>
                    {this.inventory.map(item =>{
                        return(
                            <Item toggleModal = {this.toggleModal}
                                name = {item.name}
                                value = {item.value}
                                qty = {item.quantity}
                                id = {item.id}
                            />
                        );
                    })}
                    <div id = "inv-buttons">
                        <button>Trash</button>
                        <button className = "symbol-btn"  onClick = {() => {this.toggleModal("smash")}}>+</button>
                        <button className = "symbol-btn">x</button>
                    </div>
                </div>     
            
            </div>
        )
    }
}

export default Home;