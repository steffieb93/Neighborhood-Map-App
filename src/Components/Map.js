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
    /* Variable where all the venue information will be when it is set in the state */
    state = {
        venues: [],
        venueDetails: [],
    }

    /* Functions to fetch all the venue data from the Foursquare API to put in the state */
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

    /* Functions to render and load the map to the screen */
    renderMap = () => {
        // Goes to loadScript function to make sure script is added for map to show
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyASsGNYTK3UoNt4bCAbmRvDmZI8KEwzLfM&callback=initMap")

        window.initMap = this.initMap
    }
    initMap = () => {
        // Creates the map with the center being UTA
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 32.729917, lng: -97.114516},
            zoom: 15
        })

        // Creates an info Window (for multiple markers)
        var infoWindow = new window.google.maps.InfoWindow({
            maxWidth: 250
        })

        // Creates Markers & InfoWindows for each marker for all locations in venues array
        this.state.venues.map((venueLocation) => {
            var marker = new window.google.maps.Marker({
                map: map,
                position: {lat: venueLocation.venue.location.lat, lng: venueLocation.venue.location.lng},
                title: venueLocation.venue.name,
                animation: window.google.maps.Animation.DROP,
                id: venueLocation.venue.id
            })

            // Creates InfoWindow content
            var infoContent = `<div id="content-container">
                                  <h3>${venueLocation.venue.name}</h3>
                                  <div id="venue-address">
                                     <p>${venueLocation.venue.location.formattedAddress[0]}</p>
                                     <p>${venueLocation.venue.location.formattedAddress[1]}</p>
                                  </div>
                                  <div id="test">test</div>
                               </div>`

            // When marker is clicked
            marker.addListener('click', function() {
                // Sets the Info Content to the infoWindow
                infoWindow.setContent(infoContent)

                // Opens Info Window
                infoWindow.open(map, marker)
            })
        })
    }

    render() {
        console.log('Venue', this.state.venues)
        return (
            <div className="container">
                <div id="map"></div>
                <NavBar venues={this.state.venues} />
                <SideBar venues={this.state.venues} />
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
