/*
    This is the SideBar Component File.
    This file contains the content that will show in the Side Menu.
*/

// Imports
import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'

// Class
class SideBar extends Component {
    /* Function to connect the name on list to open the correct infoWindow for the correct marker */
    listClick = (venues, e) => {
        var setMarker
        var info, moreInfo

        // Creation of InfoWindow content
        this.props.venues.map((placeName) => {
            if (placeName.venue.id === venues.venue.id) {
                info = `<div id="content-container">
                          <h3>${placeName.venue.name}</h3>
                          <div id="venue-address">
                             <p>${placeName.venue.location.formattedAddress[0]}</p>
                             <p>${placeName.venue.location.formattedAddress[1]}</p>
                          </div>
                       </div>`
            }
        })

        // Creation of the extra info Content
        this.props.venueDetails.map((details) => {
            if (details.venue.id === venues.venue.id) {
                if (details.venue.url === undefined) {
                    moreInfo = `<div>
                                  <img src="${details.venue.bestPhoto.prefix}200x200${details.venue.bestPhoto.suffix}" alt="Restaurant Picture">
                                  <p><strong>NO URL FOR RESTAURANT</strong></P>
                               </div>`
                } else {
                    moreInfo = `<div>
                                  <img src="${details.venue.bestPhoto.prefix}200x200${details.venue.bestPhoto.suffix}" alt="Restaurant Picture">
                                  <p><a href='${details.venue.url}' target='_blank'>visit site here</a></p>
                               </div>`
                }
            }
        })

        // Setting the location for infoWindow to pop up to the correct marker
        this.props.markers.map((marker) => {
            if (marker.id === venues.venue.id) {
                setMarker = marker
            }
        })

        // Setting animation for marker
        if (setMarker.getAnimation() === null) {
            setMarker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(() => {setMarker.setAnimation(null)}, 1000)
        } else {
            setMarker.setAnimation(null)
        }

        // Setting and opening content in infoWindow
        this.props.infoBox.setContent(info + moreInfo)
        this.props.infoBox.open(this.map, setMarker)
    }

    render() {
        console.log(this.props.markers)
        let showingPlaces

        if (this.props.query) {
            const match = new RegExp(escapeRegExp(this.props.query), 'i')
            showingPlaces = this.props.venues.filter((place) => match.test(place.venue.name))

            this.props.markers.map((empty) => {
                empty.setVisible(false)
                showingPlaces.map((mark) => {
                    if (empty.id === mark.venue.id) {
                        empty.setVisible(true)
                    }
                })
            })
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
                                        <li key={place.venue.id} onClick={this.listClick.bind(this, place)}>
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
