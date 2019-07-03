import React, {Component} from "react";
import "./style.css";

class Info extends Component {
    state = {
    }

    render(){
        return(
           <div id = "info-page-content">
               <h1>The Bottomless Box</h1>
               <br />
               <h2>About</h2>
               <p className = "info-desc">
                   Hello, user! Do you ache for some organization? 
                   Has your life been filled with uncertainty and self-doubt...with regard to inventory management?
                   Well, doubt and feel uncertain no more, for the Bottomless Box is here to make keeping track of the
                   things around your house infinitely less boring!
                   <hr />
               </p>
                <h2>How to Use</h2>
                <p className = "info-desc">
                    Using the Bottomless Box is much easier than it might appear.
                    Let's say you want to keep track of your supply of oranges. First, you'll have to
                    click on the + button in the dashboard (the bar at the top of the page) where you'll be
                    shown a list of different "pockets." These are essentially the "genres" of items that you want
                    to keep track of. You'll then click on the "Fruit" option, which will add a fruit pocket to 
                    your dashboard. When you want to add an item to the pocket, just click on the + button in the inventory button box (bottom right), which will
                    produce a prompt asking for the name, value, and quantity of the item you wish to store. Once you click "submit,"
                    you'll see the item pop up in your inventory.
                    <br />
                    If you want to edit the name, value, or quantity of the item you created, you can just click (or tap) on the item in the 
                    inventory and change the relevant fields.
                </p>
           </div>
        )
    }
}

export default Info;