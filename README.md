# Final Project: Neighborhod Map (React)

## Overview
For this project, a single page application will be developed featuring a map of a neighborhood of my chocie. Functionalities will be added to this map, which will include: highlighted locations, 3rd party data about those locations and various was to browse that content.

### Projcet Rubric
The project will be evaluated according to the [Neighborhood Map (React) Projcet Rubric]

### Installation Instructions
* install all project dependencies with `npm install`
* install (if needed) escapeRegExp to all project dependencies with `npm install --save escape-string-regexp`
* start the development server with `npm start`

### API Used
* Google Maps API
* Foursquare API
    * Two types of request used for this API. Their premium request has a limit of 500 calls per day and the premium request was used to get a picture and url of place

### Development Strategy
Steps on how to start this project
1. Obtain a Google Maps API Key
    * Be sure to include it as the value of the `key` parameter when loading the Google Maps API.
    * You may have some initial concerns with placing your API key directly within your JavaScript source files, but rest assured this is perfectly safe. All client-side code must be downloaded by the client; therefore, the client must download this API key (it is not intended to be secret). Google has security measures in place to ensure your key is not abused. Note that it is not technically possible to make anything secret on the client-side.
2. Add a full-screen map to your page using the Google Maps API.
    * For the sake of efficiency, the map API should be called only once
    * With your Google Maps API key and a `props` object, how can you generate a valid URL to a static Google Maps image? Would writing a function work well for this? What would that function return?
3. Write code required to display map markers identifying at least 5 locations that you are interested in within this neighborhood.
    * Your app should display those locations by default when the page is loaded.
4. Implement a list view of the set of locations you have defined.
5. Provide a filter option (e.g., a text field or dropdown menu) that uses an input field to filter both:
    * The list view
    * The map markers displayed by default on load. The list view and the markers should update accordingly in real time.
    * **Note:** Providing a search function through a third-party API is not enough to meet specifications.
6. Add functionality using third-party APIs to provide information when a map marker or list view entry is clicked (e.g., Yelp reviews, Wikipedia, Flickr images, etc).
    * StreetView and Places do not count as an additional 3rd party API because they are libraries included in the Google Maps API
    * If you need a refresher on how to make Ajax requests to third-party servers, check out [Intro to Ajax]
    * Please provide attribution to the data sources and/or APIs you use (e.g., if you are using Foursquare, indicate somewhere in your interface and in your README that you used Foursquare's API)
7. Be sure that all application components (i.e., a search box, a list view, and the map) render on-screen in a responsive manner.
    * The design is completely up to you regardless of the viewport size (e.g., maybe the list view is viewable from a hamburger menu on mobile) -- but all components must still render and be fully functional.
    * Any additional components added to the project must also render and be fully functional.

Overall, the application's interface should be intuitive to use. Here are a few examples of how to make the experience straightforward for your user:
* The input text area to filter locations should be easy to locate
* It should be simple to understand which set of locations is being filtered
* Selecting a location via list item or map marker should cause the map marker to bounce, or in some other way animate. This indicates that the location has been selected, and an associated info window should open above the map marker with additional information

### Asynchronicity and Error Handling
All data API's used in the application should load asynchronously, and errors should be handled gracefully. In case of error (e.g., a situation in which a third party API does not return the expected result), we expect your webpage to do one of the following:
* A message is displayed that notifies the user that the data cannot be loaded
* There are no negative repercussions to the UI

**Note:** You should handle errors if the browser has trouble initially reaching the third-party site as well. For example, consider a user using your Neighborhood Map, but the user's firewall prevents him/her from accessing the Instagram servers.

#### Create React App

This project was bootstrapped with [Create React App]. You can find more information on how to perform common tasks [here].

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [Neighborhood Map (React) Projcet Rubric]: <https://review.udacity.com/#!/rubrics/1351/viewxr>
   [Intro to Ajax]: <https://www.udacity.com/course/intro-to-ajax--ud110>
   [Create React App]: <https://github.com/facebookincubator/create-react-app>
   [here]: <https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md>
