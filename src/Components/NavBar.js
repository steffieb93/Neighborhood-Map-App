/*
    This is the NavBar Component File.
    This file contains the content that will show in the Navigation Bar.
*/

// Imports
import React, { Component } from 'react'

// Class
class NavBar extends Component {
    /* Function to toggle the hidden class to show/hide the SideBar */
    sideMenu = () => {
        var change = window.document.getElementById('side')

        change.classList.toggle("hidden")
    }

    render() {
        return (
            <div className="navContainer">
                <nav className="navBar">
                    <div className="menu">
                        <button className="icon" onClick={this.sideMenu}>
                            <i className="fa fa-bars"></i>
                        </button>
                    </div>
                    <div>
                        <h1>My Neighborhood Map</h1>
                    </div>
                </nav>
            </div>
        )
    }
}

export default NavBar
