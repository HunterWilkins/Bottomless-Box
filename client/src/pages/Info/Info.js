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
                   Hello! Do you ache for some organization? 
                   Has your life been filled with uncertainty and self-doubt...with regard to inventory management?
                   Well, doubt and feel uncertain no more! The Bottomless Box is here to make keeping track of the
                   things around your house less boring!
               </p>
                <h2>How to Use</h2>
                <hr />
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
                    If you activate the trash icon in the sidebar,
                     you'll delete the entire pocket you're inside, along with all the items. 
                    <br />
                    If you wish to delete a single item, click (or tap) on the item and hit the 
                    trash icon at the bottom left of the popup. 
                </p>
                <h2>PREPARE TO BUY EDITION: Shopping List Mode</h2>
                <p className = "info-desc">
                    Those who might've used this app before will notice a new "shopping cart" icon.
                    This button toggles "shopping list mode," where you can plan out exactly what you need and how much you need it.
                    The Bottomless Box was originally created as an inventory management system, but I have almost
                    exclusively been using it as an electronic shopping list. So, rather than keep it as it is or change it entirely,
                    I added the shopping list mode. 
                    <br />
                    You can click the shopping cart icon in the "Create Item" or "Edit Item" popup to switch it from the
                    shopping list to your inventory.
                </p>
                <hr />
                <h2>How does this app store data?</h2>
                <p className = "info-desc">
                    This app uses local storage to store the item data. For those who aren't in the know: 
                    local storage is specific to the browser and device the app is running on. You can't, 
                    for example, create and store an item on your phone and expect to find it on your desktop. 
                    Similarly, you can't create and store an item on Safari and have it carry over to Google Chrome or Firefox.
                    In order for that to work, there would have to be a login page where you'd enter a username and password. As a tech-savvy millennial,
                    I, personally, find Login functionality to be anti-consumer. Moreso than local storage might be.
                </p>

                <hr />

                <Link to= "/"><button onClick = {this.setFirstTime}id = "home-button">Open the Bottomless Box!</button></Link>
                </div>
           </div>
        )
    }
}

export default Info;