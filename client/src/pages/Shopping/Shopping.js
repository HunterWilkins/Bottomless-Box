import React, {Component} from "react";
import "./style.css";

class Shopping extends Component {
    state = {
        localInventory: JSON.parse(localStorage.getItem("inventory"))
    }
    updateStorage = () => { // Overwrites the old info stored in LocalStorage. 
        
        // Resets all the ids of all items within the inventory array to account for any items that might've been deleted.
        let newId = 0; 
        this.inventory.forEach(item => {
            item.id = newId;
            newId++;
        });
        // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/

        localStorage.setItem("inventory", JSON.stringify(this.inventory));
        localStorage.setItem("pockets", JSON.stringify(this.pockets));
    }
    
    componentWillMount = () => { // Takes the localStorage inventory/pocket arrays and adds all items from them into their respective program arrays.
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

        // Simply checks if this is the user's first time using the Bottomless Box
        let firstTime = JSON.parse(localStorage.getItem("firstTime"));
        if (!firstTime) {
            this.firstTime = true;
        }
        // =/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/=/
    }

    handleInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        });
    };

    render(){
        return (
          <div>
              
          </div>   
        );
    }
}

export default Shopping;