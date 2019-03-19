import React, { Component } from 'react';

class Map extends Component {
    state = {
        venues: []
    }

    componentDidMount() {
        this.getVenues()
    }

    renderMap = () => {
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyASsGNYTK3UoNt4bCAbmRvDmZI8KEwzLfM&callback=initMap")

        window.initMap = this.initMap
    }

    getVenues = () => {
        const parameters = {
            client_id: "BWQBYMTVPIMXE2000VPH3OOCCOKVASFXO0SBDA0UNU5FYTVO",
            client_secret: "FCWVCH3HYKFC1UEIYQU5IZFOPP2X2GBNRB2UXG5EJWNIHARG",
            limit: 10,
            ll: "32.729917,-97.114516",
            query: "food"

        }

        // 'https://api.foursquare.com/v2/venues/explore?client_id=BWQBYMTVPIMXE2000VPH3OOCCOKVASFXO0SBDA0UNU5FYTVO&client_secret=FCWVCH3HYKFC1UEIYQU5IZFOPP2X2GBNRB2UXG5EJWNIHARG&v=20180323&limit=5&ll=32.729917,-97.114516&query=food'

        fetch('https://api.foursquare.com/v2/venues/explore?client_id=' + parameters.client_id + '&client_secret=' + parameters.client_secret + '&v=20180323&limit=' + parameters.limit + '&ll=' + parameters.ll + '&query=' + parameters.query)
        .then((resp) => resp.json())
        .then((data) => {
            // Code for handling API response
            this.setState({venues: data.response.groups[0].items}, this.renderMap())
        })
        .catch((error) => {
            // Code for handling errors
            console.log(error)
        });
    }

    initMap = () => {
        var map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 32.729917, lng: -97.114516},
            zoom: 15
        })

        this.state.venues.map((myVenue) => {
            var marker = new window.google.maps.Marker({
                position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
                map: map,
                animation: window.google.maps.Animation.DROP,
                id: myVenue.venue.id,
                title: myVenue.venue.name
            })
        })


    }

    render() {
        console.log(this.state.venues)
        return (
          <div id="map"></div>
        )
    }
}

function loadScript(url) {
    var index = window.document.getElementsByTagName("script")[0]
    var script = window.document.createElement("script")

    script.src = url
    script.async = true
    script.defer = true

    index.parentNode.insertBefore(script, index)
}

export default Map
