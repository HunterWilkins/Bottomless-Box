import React, {Component} from "react";
import "./style.css";
import {Link} from "react-router-dom";

class Info extends Component {
    state = {
    }

    setFirstTime = () => {
        if (!localStorage.getItem("firstTime")) {
            localStorage.setItem("firstTime", true);
        }
    }

    render(){
        return(
           <div id = "info-page-content">
               
               <h1>The Bottomless Box</h1>
               <br />
               <div id = "overall-text-box">
               <h2>About</h2>
               <p className = "info-desc">
                   Hello, user! Do you ache for some organization? 
                   Has your life been filled with uncertainty and self-doubt...with regard to inventory management?
                   Well, doubt and feel uncertain no more, for the Bottomless Box is here to make keeping track of the
                   things around your house infinitely less boring!
               </p>
                <h2>How to Use</h2>
                <h2>Adding/Editing Items</h2>
                
                <p className = "info-desc">
                    This app separates items by type via "pockets." If you want to store the information
                    of an apple, for example, you have to create a "Fruit" pocket to store it in first. To create a pocket, 
                    all you have to do is press the + button in the dashboard (the top left of the page) and choose one of the 
                    available pocket types. Then, to store an item (and any subsequent items), you just need to press the + button
                    in the sidebar. You'll be presented with a popup that asks for the name, value, and quantity of the item.
                    <br /><br />
                    Whenever you want to edit the name, value, or quantity of the item you created, click (or tap) on the item in the 
                    inventory and change the relevant fields.
                </p>

                <h2>Deleting Items/Pockets</h2>
                <p className = "info-desc">
                    At the top right of the inventory button section, you'll see a trash icon. If you activate this,
                    then you'll delete the entire pocket you're inside, along with all the items. 
                    <br />
                    If you wish to delete a single item, click (or tap) on the item and hit the 
                    trash icon at the bottom left of the popup. 
                </p>

                <h2>What the $ button does</h2>
                <p className = "info-desc">
                    This handy button takes all the items in the current pocket and calculates the total value
                    of the pocket. You can calculate the total value of all of your items by going into the "All"
                    pocket (the one with the treasure chest image) and activating the button.

                    <br /><br />
                    This feature has potential outside of its current functionality, and might be expanded upon
                    in the future.

                </p>


                <hr />

                <Link to= "/"><button onClick = {this.setFirstTime}id = "home-button">Open the Bottomless Box!</button></Link>
                </div>
           </div>
        )
    }
}

export default Info;