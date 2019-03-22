import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

class SideBar extends Component {
    /*state = {
        query: '',
    }*/

    render() {
        console.log(this.props.markers)
        let showingPlaces
        if (this.props.query) {
            const match = new RegExp(escapeRegExp(this.props.query), 'i')
            showingPlaces = this.props.venues.filter((place) => match.test(place.venue.name))

            this.props.markers.map((empty) => {
                if (empty.title === "Chick-fil-A") {
                    empty.setVisible(true)
                } else {
                    empty.setVisible(false)
                }
            })

            /*this.props.markers.map((empty) => {
                showingPlaces.map((mark) => {
                    if (showingPlaces.venue.id === empty.id) {
                        empty.setVisible(true)
                    } else {
                        empty.setVisible(false)
                    }
                })
            })*/
        } else {
            showingPlaces = this.props.venues
            this.props.markers.map((empty) => {
                empty.setVisible(true)
            })
        }
        return (
            <div className="sideContainer">
                <div id="side" className="sideBar hidden">
                    <h2>Map of UT Arlington</h2>
                    <div className="search-places-bar">
                        <input
                            type="text"
                            placeholder="Search for Place Here"
                            onChange={(event) => this.props.updateQuery(event.target.value)}
							value={this.props.query} />
                    </div>

                    <div className="places-list">
                        <ol className="places-grid">
                            {
                                showingPlaces.map((place) => {
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
