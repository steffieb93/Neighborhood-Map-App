import React, { Component } from 'react'

class NavBar extends Component {
    sideMenu = () => {
        var change = window.document.getElementById('side')

        change.classList.toggle("hidden")
    }

    render() {
        //console.log('NavBar', this.props.venues)
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
