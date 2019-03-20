import React, { Component } from 'react'

class NavBar extends Component {
    render() {
        console.log('NavBar', this.props.venues)
        return (
            <div className="navContainer">
                <nav className="navBar">
                    <h1>My Neighborhood Map</h1>
                </nav>
            </div>
        )
    }
}

export default NavBar
