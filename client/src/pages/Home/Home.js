import React, {Component} from "react";
import "./style.css";

import Pocketbook from "../../components/Pocketbook";
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
                itemVal: infoObject.value,
                itemQty: infoObject.quantity,
                itemId: infoObject.id,
                modalType:"item"
            });
            console.log("Item Type Creation");
            console.log(infoObject);
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
        console.log(this.state);

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