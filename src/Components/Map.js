/*
    This is the Map Component File.
    This file contains the content that will help with showing the map, markers, and infowindows.
*/

// Imports
import React, { Component } from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'

// Class
class Map extends Component {
    /* Variables where all the venue details, markers, and infoWindow, information will be when it is set in the state */
    state = {
        venues: [],
        venueURL: [],
        venueDetails: [],
        query: '',
        markers: [],
        infoBox: {}
    }

    /* Functions to fetch all the venue data from the Foursquare API to put in the venues state */
    componentDidMount() {
        this.fetchVenues()
    }
    fetchVenues = () => {
        // These are the parameters needed to make a request in JavaScript for the Foursquare API
        const parameters = {
            client_id: "BWQBYMTVPIMXE2000VPH3OOCCOKVASFXO0SBDA0UNU5FYTVO",
            client_secret: "FCWVCH3HYKFC1UEIYQU5IZFOPP2X2GBNRB2UXG5EJWNIHARG",
            limit: 10,
            ll: "32.729917,-97.114516",
            query: "food"
        }

        fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + parameters.client_id + '&client_secret=' + parameters.client_secret + '&v=20180323&limit=' + parameters.limit + '&ll=' + parameters.ll + '&query=' + parameters.query)
        // Parses only the JSON data
        .then((response) => response.json())
        // Setting the API response to the venue state
        .then((data) => {
            this.setState({venues: data.response.groups[0].items}, this.renderMap())
        })
        // If an error occurs
        .catch((error) => {
            console.log(error)
        })
    }
    fetchVenueDetails = (venueID) => {
        // Parameters to fetch more details from the Foursquare API. Need to go through the Premium API requests to get an image and url for venues
        const parameter = {
            client_id: "BWQBYMTVPIMXE2000VPH3OOCCOKVASFXO0SBDA0UNU5FYTVO",
            client_secret: "FCWVCH3HYKFC1UEIYQU5IZFOPP2X2GBNRB2UXG5EJWNIHARG"
        }

        fetch('https://api.foursquare.com/v2/venues/' + venueID + '?client_id=' + parameter.client_id + '&client_secret=' + parameter.client_secret + '&v=20180323')
        .then((response) => response.json())
        .then((data) => {
            // Sets the individual venue data to the venueURL state
            this.setState({venueURL: data.response})
            this.addTovenueDetails()
        })
        .catch((error) => {
            console.log(error)
        })
    }
    addTovenueDetails = () => {
        // Pushes the individual venue infomation to the venueDetails state to have all of the extra venue details in one array
        this.setState((state) => {
            state.venueDetails.push(state.venueURL)

        })
    }

    /* Function to update Query state when someone usues the search box */
    updateQuery = (query) => {
        this.setState({query: query})
    }

    /* Functions to render and load the map to the screen */
    renderMap = () => {
        // Goes to loadScript function to make sure script is added to index HTML for map to show
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyASsGNYTK3UoNt4bCAbmRvDmZI8KEwzLfM&callback=initMap")

        window.initMap = this.initMap
    }
    initMap = () => {
        // Creates the map with the center being UTA
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 32.729917, lng: -97.114516},
            zoom: 15
        })
        window.mapObj = this.map

        // Creates an info Window (for multiple markers) and sets to infoBox state
        var infoWindow = new window.google.maps.InfoWindow({
            maxWidth: 250
        })
        this.setState({infoBox: infoWindow})

        // Creates Markers & InfoWindow Content for each marker for all locations in venues array
        this.state.venues.map((venueLocation) => {
            this.fetchVenueDetails(venueLocation.venue.id)

            // Creation of Markers
            var marker = new window.google.maps.Marker({
                map: map,
                position: {lat: venueLocation.venue.location.lat, lng: venueLocation.venue.location.lng},
                title: venueLocation.venue.name,
                animation: window.google.maps.Animation.DROP,
                id: venueLocation.venue.id
            })
            this.setState((state) => {
                state.markers.push(marker)
            })

            // Creation of InfoWindow content
            var infoContent = `<div id="content-container">
                                  <h3>${venueLocation.venue.name}</h3>
                                  <div id="venue-address">
                                     <p>${venueLocation.venue.location.formattedAddress[0]}</p>
                                     <p>${venueLocation.venue.location.formattedAddress[1]}</p>
                                  </div>
                               </div>`

            // When marker is clicked
            marker.addListener('click', function() {
                // Gives marker an animation
                if (marker.getAnimation() === null) {
                    marker.setAnimation(window.google.maps.Animation.BOUNCE)
                    setTimeout(() => {marker.setAnimation(null)}, 1000)
                } else {
                    marker.setAnimation(null)
                }

                // Sets the Info Content to the infoWindow
                infoWindow.setContent(infoContent)
                var extraDetails = test(this.id)
                infoWindow.setContent(infoContent + extraDetails)

                // Opens Info Window
                infoWindow.open(map, marker)
            })
        })

        // Function to create and return the extra details for the infoWindow
        var test = (id) => {
            let moreDetails

            this.state.venueDetails.map((detail) => {
                if(detail.venue.id === id){
                    if (detail.venue.url === undefined) {
                        moreDetails = `<div>
                                          <img src="${detail.venue.bestPhoto.prefix}200x200${detail.venue.bestPhoto.suffix}" alt="Restaurant Picture">
                                          <p><strong>NO URL FOR RESTAURANT</strong></P>
                                       </div>`
                    } else {
                        moreDetails = `<div>
                                          <img src="${detail.venue.bestPhoto.prefix}200x200${detail.venue.bestPhoto.suffix}" alt="Restaurant Picture">
                                          <p><a href='${detail.venue.url}' target='_blank'>visit site here</a></p>
                                       </div>`
                    }

                }
            })

            return moreDetails
        }
    }

    render() {
        return (
            <div className="container">
                <div id="map"></div>
                {/* Connects the NavBar and SideBar Components with the Map Component */}
                <NavBar venues={this.state.venues} />
                <SideBar
                    venues={this.state.venues}
                    venueDetails={this.state.venueDetails}
                    query={this.state.query}
                    updateQuery={this.updateQuery}
                    markers={this.state.markers}
                    infoBox={this.state.infoBox} />
            </div>
        )
    }
}

// Function to load a script tag to the index.html file for Google Maps to show on screen
function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")

    script.src = url
    script.async = true
    script.defer = true

    index.parentNode.insertBefore(script, index)
}

export default Map
