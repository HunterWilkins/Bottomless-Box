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
        itemQty: 0,
        itemId: "",
        itemType: "",

        theme: "Brown",

        invScreen: "All"
    }

    firstTime;
    inventory = [];
    pockets = [];

    colorSchemes = {
        Blue: {
            background: "rgb(28,32,32)",
            color: "rgb(198, 253, 247)",
            ultraBackground: {
                background: "rgb(6,7,15)"
            }
        },
        Brown: {
            background: "rgb(32,28,28)",
            color: "rgb(253, 214, 198)"
        },
        Green: {
            background: "rgb(28, 32, 28)",
            color: "rgb(226, 253, 198)"
        }
    }

    updateStorage = () => {
        let newId = 0;
        this.inventory.forEach(item => {
            item.id = newId;
            newId++;
        });

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

        let firstTime = JSON.parse(localStorage.getItem("firstTime"));
        if (!firstTime) {
            window.location.replace("/info");
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
        }

        else if (type === "inventory") {
            this.setState({
                modalType: "inventory",
                itemName: null,
                itemVal: " ",
                itemQty: " ",
                itemId: " " 
            });
        }

        else if (type === "settings") {
            this.setState({
                modalType: "settings"
            });
        }
    }

    addQty = () => {
        if (this.state.itemQty === "") {
            this.setState({
                itemQty: 1
            });
        }
        else {
            let oldValue = parseInt(this.state.itemQty);
            let newValue = oldValue + 1;
            this.setState({
                itemQty: newValue
            });
        }
    }

    subQty = () => {
        if (this.state.itemQty !== 0 && this.state.itemQty !== "") {
            let oldValue = parseInt(this.state.itemQty);
            let newValue = oldValue - 1;
            this.setState({
                itemQty: newValue
            });
        }
    }

    calcTotal = () => {
        let total = 0;

        if (this.state.invScreen === "All") {
            this.inventory.forEach(item => {
                total += parseFloat(item.value * item.quantity);
            });

            alert("All of your items add up to $" + total.toFixed(2) + ".");
        }
        else {
            this.inventory.forEach(item => {
                if (item.type === this.state.invScreen) {
                    total += parseFloat(item.value * item.quantity);
                }
            });
            alert("Total Value of " + this.state.invScreen + " Pocket = $" + total.toFixed(2));
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


        this.inventory.forEach(item => {
            if (item.id === this.state.itemId) {
                repeat = true;
            }
        });

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
        this.setState({
            itemName: "",
            itemVal: "",
            itemQty: ""
        });
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
        
        if (this.state.invScreen === "All") {
            let confirmation = window.confirm("Are you sure that you want to delete all of your items?");
            if (confirmation) {
                this.inventory = [];
                this.pockets = [];
            }
        }

        else {
            let newArray = [];
            for (var i = 0; i < this.inventory.length; i++) {
                let item = this.inventory[i];
                if (item.type !== this.state.invScreen) {
                    newArray.push(item);
                }
            };
            this.inventory = newArray;

            this.pockets.splice((this.pockets.indexOf(this.state.invScreen)), 1);
        }

        this.updateStorage();
        this.setState({
            invScreen: "All"
        });
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
                this.inventory.splice(this.inventory.indexOf(item), 1);
                this.updateStorage();
            }
        });

        this.toggleModal();
    };


    render(){
        if (this.state.modal){
            return (
                <div>
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
                    addQty = {this.addQty}
                    subQty = {this.subQty}

                    makePocket = {this.makePocket}

                    type = {this.state.modalType}
                />                
                </div>
            )
        }
        return(
            <div id = "content">
                
                
                <Pocketbook 
                pockets = {this.pockets} 
                toggleModal = {this.toggleModal}
                toggleInv = {this.toggleInv}
                invScreen = {this.state.invScreen}
                colorSchemes = {this.colorSchemes}
                />
                
                <Inventory 
                    colorSchemes = {this.colorSchemes}
                    inventory = {this.inventory} 
                    invScreen = {this.state.invScreen} 
                    toggleModal = {this.toggleModal}
                    deletePocket = {this.deletePocket}
                    calcTotal = {this.calcTotal}
                    theme = {this.state.theme}

                />
            </div>
        )
    }
}

export default Home;