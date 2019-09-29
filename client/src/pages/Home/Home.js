import React, {Component} from "react";
import "./style.css";
import Pocketbook from "../../components/Pocketbook";
import Modal from "../../components/Modal";
import Inventory from "../../components/Inventory";
import Info from "../Info/Info";

class Home extends Component {

    state = {
        modal: false, // Is the modal displayed?
        modalType: "inventory", // Where is the modal being displayed from?
        
        // Temporary Storage for item information. Used for Modal placeholders and Item Submission via HandleInputChange
        itemName: "",
        itemVal: "",
        itemQty: 0,
        itemId: "",
        itemType: "",
        // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

        // Shopping List Mode =/=/=/=/=/=/=/=/=/=/=/=/=/=/
        shopping: false,
        shoppingList: false,
        // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=
        tax: parseFloat(JSON.parse(localStorage.getItem("tax"))),
        total: "",
        invScreen: "All", // Which pocket is the user in?
        localInventory: JSON.parse(localStorage.getItem("inventory"))
    }

    firstTime; // Is it the user's first time using the app? Is set and decided via localStorage.
    inventory = []; // Array of items stored as objects (name, value, quantity, id, type)
    pockets = []; // Array of pockets stored as strings

    updateStorage = () => { // Overwrites the old info stored in LocalStorage. 
        
        // Resets all the ids of all items within the inventory array to account for any items that might've been deleted.
        let newId = 0; 
        this.inventory.forEach(item => {
            item.id = newId;
            newId++;

            // if (item.quantity === 0) {
            //     item.shopping = true;
            // }
        });
        // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
        localStorage.setItem("tax", JSON.stringify(this.state.tax));
        localStorage.setItem("inventory", JSON.stringify(this.inventory));
        localStorage.setItem("pockets", JSON.stringify(this.pockets));
    }
    
    UNSAFE_componentWillMount = () => { // Takes the localStorage inventory/pocket arrays and adds all items from them into their respective program arrays.
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

        let localTax = JSON.parse(localStorage.getItem("tax"));
        if (localTax) {
            this.setState({
                tax: parseFloat(localTax)
            });
        }

        // Simply checks if this is the user's first time using the Bottomless Box
        let firstTime = JSON.parse(localStorage.getItem("firstTime"));
        if (!firstTime) {
            this.firstTime = true;
        }
        // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
    }

    toggleModal = (type, infoObject, pocket ) => { // Toggles the display for the Modal based on which button was activated
        this.setState({modal:!this.state.modal});

        if (type === "pocket"){ // "Create Pocket" Modal
            this.setState(
                {
                    modalType:"pocket"
                }
            );
        }

        else if (type === "item") { // "Update Item" Modal
            this.setState({
                itemName: infoObject.name,
                itemVal: infoObject.value,
                itemQty: infoObject.quantity,
                itemId: infoObject.id,
                modalType:"item"
            });
        }

        else if (type === "inventory") { // "New Item" Modal
            this.setState({
                modalType: "inventory"
            });
        }

        else if (type === "magna carta") { // "Tax" Modal
            this.setState({
                modalType: "magna carta"
            });
        }
    }

    addQty = () => { // Adds 1 to the quantity value of the selected item
        let oldValue = parseInt(this.state.itemQty);
        let newValue = oldValue + 1;
        this.setState({
            itemQty: newValue
        });
    }

    subQty = () => { // Subtracts 1 from the quantity value of the selected item, provided it's a nonzero, positive value
        if (this.state.itemQty !== 0 && this.state.itemQty !== "") {
            let oldValue = parseInt(this.state.itemQty);
            let newValue = oldValue - 1;
            this.setState({
                itemQty: newValue
            });
        }
    }

    toggleShopping = () => {
        this.setState({
            shopping: !this.state.shopping
        });
    }

    toggleInv = (pocketName) => { // Toggles the inventory component to reflect the current pocket
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

    create = () => { // Create Item function
        
        // If the current item exists already in the array, run the update function. Else, create a new item.
        let repeat;

        this.inventory.forEach(item => {
            if (item.id === this.state.itemId) {
                repeat = true;
            }
        });

        if (!repeat) {
            let newItem = {
                name: this.state.itemName,
                value: parseFloat(this.state.itemVal).toFixed(2),
                quantity: parseInt(this.state.itemQty),
                type: this.state.invScreen,
                id: this.inventory.length,
                shopping: this.state.shopping
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

    makePocket = (newItemType) => {
        
        if (this.pockets.indexOf(newItemType) === -1) {
            this.pockets.push(newItemType);
        }

        this.updateStorage();
        this.toggleModal("inventory");
        this.toggleInv(newItemType);
    }

    deletePocket = () => { // Sidebar Trash Icon functionality
        
        if (this.state.invScreen === "All") { // Wipe inventory and pocket information after confirmation
            let confirmation = window.confirm("Are you sure that you want to delete all of your items?");
            if (confirmation) {
                this.inventory = [];
                this.pockets = [];
            }
        }

        else { // Add items that AREN'T the item type to be deleted into an array and overwrite the original array
            let newArray = [];
            for (var i = 0; i < this.inventory.length; i++) {
                let item = this.inventory[i];
                if (item.type !== this.state.invScreen) {
                    newArray.push(item);
                }
            };
            this.inventory = newArray;

            this.pockets.splice((this.pockets.indexOf(this.state.invScreen)), 1); // Delete relevant pocket
        }

        this.updateStorage();
        this.setState({
            invScreen: "All"
        });
    }

    update = (id) => { // Overwrites the relevant info of the item within the inventory array with the state item's same id
        this.inventory.forEach(item => {
            if (item.id === id){
                item.name = this.state.itemName;
                item.value = parseFloat(this.state.itemVal).toFixed(2);
                item.quantity = parseInt(this.state.itemQty);
                item.shopping = this.state.shopping;
            }
        });

        this.updateStorage();
    };

    updateTax = () => {
        localStorage.setItem("tax", this.state.tax);
        this.toggleModal();
    }

    delete = () => { // "Item" Modal type Trash Icon functionality
        this.inventory.forEach(item => {
            if (item.id === this.state.itemId) {
                this.inventory.splice(this.inventory.indexOf(item), 1);
                this.updateStorage();
            }
        });

        this.toggleModal();
    };

    toggleShoppingList = () => {

        this.setState({
            shoppingList: !this.state.shoppingList,
            shopping: !this.state.shoppingList
        });
    }


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

                    shopping = {this.state.shopping}
                    shoppingList = {this.state.shoppingList}
                    toggleShopping = {this.toggleShopping}
                    toggleShoppingList = {this.toggleShoppingList}

                    tax = {this.state.tax}

                    makePocket = {this.makePocket}

                    updateTax = {this.updateTax}

                    type = {this.state.modalType}
                />                
                </div>
            )
        }
        if (this.firstTime) {
            this.firstTime = false;
            return(
                <Info />
            )
        }
        else {
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
                        tax = {this.state.tax}

                        total = {this.state.total}
                        localInventory = {this.state.localInventory}

                        shopping = {this.state.shopping}

                        shoppingList = {this.state.shoppingList}

                        toggleShopping = {this.toggleShopping}
                        toggleShoppingList = {this.toggleShoppingList}
                    />
                </div>
            )
        }
        
    }
}

export default Home;