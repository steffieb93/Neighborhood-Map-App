import React, { Component } from 'react'

class SideBar extends Component {
    state = {
        query: '',
        searchPlace: []
    }

    /*updateQuery = () => {
        console.log(this.state.query)
    }*/

    render() {
        //console.log('SideBar', this.props.venues)
        return (
            <div className="sideContainer">
                <div id="side" className="sideBar hidden">
                    <h2>Map of UT Arlington</h2>
                    <div className="search-places-bar">
                        <input
                            type="text"
                            placeholder="Search for Place Here" />
                    </div>

                    <div className="places-list">
                        <ol className="places-grid">
                            {
                                this.props.venues.map((place) => {
                                    let placeName = place.venue.name
                                    return (
                                        <li key={place.venue.id}>
                                            {place.venue.name}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default SideBar
