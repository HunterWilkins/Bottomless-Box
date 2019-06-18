import React, {Component} from "react";
import "./style.css";

import Pocket from "../../components/Pocket";
import Modal from "../../components/Modal";
import Inventory from "../../components/Inventory";

class Home extends Component {
    state = {
        modal: false,
        modalType: "",
        itemName: "",
        itemVal: "",
        itemQty: "",
        itemId: "",
        itemType: "",

        invScreen: "All"
    }

    inventory = [];
    pockets = [];

    updateStorage = () => {
        localStorage.setItem("inventory", JSON.stringify(this.inventory));
        localStorage.setItem("pockets", JSON.stringify(this.pockets));
    }
    
    componentWillMount = () => {
        let localInv = JSON.parse(localStorage.getItem("inventory"));
        if (localInv){
            localInv.forEach(item => {
                this.inventory.push(item);
            });
        }

        let localPockets = JSON.parse(localStorage.getItem("pockets"));
        if (localPockets) {
            localPockets.forEach(item => {
                this.pockets.push(item);
            });
        }
    }


    toggleModal = (type, infoObject, pocket ) => {
        console.log("Modal Type: " + type);
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

        else if (type === "inventory") {
            this.setState({
                modalType: "inventory"
            })
        }
    }

    toggleInv = (pocketName) => {
        this.setState({
            invScreen: pocketName
        });
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
                type: this.state.invScreen,
                id: this.inventory.length
            }
            

            this.inventory.push(newItem);
            this.updateStorage();
        }
        else {
            this.update(this.state.itemId);
        }

        this.filteredInv = this.inventory.filter(item => item.type === this.state.invScreen);

        
        console.log(this.inventory);
        console.log(this.filteredInv);
    }

    makePocket = (newItemType) => {
        console.log(newItemType);
        if (this.pockets.indexOf(newItemType) === -1) {
            this.pockets.push(newItemType);
        }
        this.updateStorage();
        this.toggleInv();
        this.toggleModal("inventory");
    }

    deletePocket = () => {
        let deletedPocketIndex = this.pockets.indexOf(this.state.invScreen);
        this.pockets.splice(deletedPocketIndex,1);
        this.inventory.forEach(item => {
            if (item.type === this.state.invScreen) {
                let deletionIndex = this.inventory.indexOf(item);
                console.log(this.inventory[deletionIndex]);

                this.inventory.splice(this.inventory[deletionIndex]);
                this.updateStorage();
            }
        })
        this.updateStorage();
        console.log(this.inventory);
        console.log(deletedPocketIndex);
        console.log(this.pockets);
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

                    makePocket = {this.makePocket}

                    type = {this.state.modalType}
                />

                <div id = "dashboard">
                
                    <Pocket func = "add" toggleModal = {this.toggleModal} modalType = {this.state.modalType}/>

                    {this.pockets.map(item =>{
                        return(
                            <Pocket 
                                name = {item}
                                toggleInv = {this.toggleInv}
                            />
                        );
                    })}
                    
                </div>

                <Inventory 
                    inventory = {this.inventory} 
                    invScreen = {this.state.invScreen} 
                    toggleModal = {this.toggleModal}
                    deletePocket = {this.deletePocket}
                />
            </div>
        )
    }
}

export default Home;