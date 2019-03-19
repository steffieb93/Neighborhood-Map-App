/*
    This is the Application File.
    This will be the file that shows the content in the Map, Sidebar, and Nav Components.
*/

// Imports
import React, { Component } from 'react'
import Map from './Components/Map'
import './App.css'

// Class
class App extends Component {

    render() {
        return (
            <div className="App">
                {/* Displays the Map Component */}
                <Map />
            </div>
        )
    }
}

export default App
