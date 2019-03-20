import React, { Component } from 'react'

class SideBar extends Component {
    render() {
        console.log('SideBar', this.props.venues)
        return (
            <div className="sideContainer">
                <div className="sideBar">
                    <h2>Map of UT Arlington</h2>
                    <div>
                        <input type="button" className="listingsButton" id="show-listings" value="Show Listings" />
                        <input type="button" className="listingsButton" id="hide-listings" value="Hide Listings" />
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar
