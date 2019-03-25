/*
    This is the Application File.
    This will be the file that shows the content in the Map, Sidebar, and NavBar Components.
*/

// Imports
import React, { Component } from 'react'
import Map from './Components/Map'
import NavBar from './Components/NavBar'
import SideBar from './Components/SideBar'
import './App.css'

// Class
class App extends Component {

    render() {
        return (
            <div className="App">
                {/* Displays the Map Component. Note: NavBar and SideBar Components are within the Map Component */}
                <Map />
            </div>
        )
    }
}

export default App
