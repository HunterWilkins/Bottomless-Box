import React, {Component} from "react";
import "./style.css";

import Pocketbook from "../../components/Pocketbook";
import Modal from "../../components/Modal";
import Inventory from "../../components/Inventory";

class Home extends Component {
    state = {
        modal: false,
        modalType: "inventory",
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
        this.setState({modal:!this.state.modal});

        console.log("Modal Type Before Button Pressed:");
        console.log(this.state.modalType);

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
                itemVal: infoObject.value,
                itemQty: infoObject.quantity,
                itemId: infoObject.id,
                modalType:"item"
            });
        }

        else if (type === "inventory") {
            this.setState({
                modalType: "inventory",
                itemName: "",
                itemVal: "",
                itemQty: "",
                itemId: ""
            })
        }
        
        console.log("Modal Type After Button Pressed:");
        console.log(this.state.modalType);
        console.log("=/=/=/=/=/=/=/=/=/=/");
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
        this.toggleModal("inventory", "");

    }

    logState = () => {
        console.log(this.state);
    }

    makePocket = (newItemType) => {
        if (this.pockets.indexOf(newItemType) === -1) {
            this.pockets.push(newItemType);
        }
        this.updateStorage();
        this.toggleModal("inventory");
        this.toggleInv(newItemType);
    }

    deletePocket = () => {

        if (this.state.invScreen !== "All") {
            let deletedPocketIndex = this.pockets.indexOf(this.state.invScreen);
            this.pockets.splice(deletedPocketIndex,1);
            this.inventory.forEach(item => {
                if (item.type === this.state.invScreen) {
                    let deletionIndex = this.inventory.indexOf(item);
                    this.inventory.splice(this.inventory[deletionIndex]);
                    this.updateStorage();
                }
            });
            this.updateStorage();
            this.setState({
                invScreen: "All"
            });
        }

        else {
            this.inventory = [];
            this.pockets = [];
            this.updateStorage();
            this.setState({
                invScreen: "All"
            });
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

    delete = (id) => {
        console.log(id);
        this.inventory.forEach(item => {
            
            if (item.id === id) {
                console.log("The item id in Inventory:");
                console.log(item.id);

                console.log("The item id passed into this:");
                console.log(id)
                let deletionIndex = this.inventory.indexOf(item);
                console.log("Deleted Item");
                console.log(this.inventory[deletionIndex]);

                this.inventory.splice(this.inventory[deletionIndex], 1);
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

                <button onClick = {this.logState}>Log State</button>
                
                
                <Pocketbook 
                pockets = {this.pockets} 
                toggleModal = {this.toggleModal}
                toggleInv = {this.toggleInv}
                />
                

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