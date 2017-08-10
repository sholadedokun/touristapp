import axios from 'axios';
import _ from 'lodash';
// import { browserHistory } from 'react-router';
import {
  FETCH_CITYNAME,
  FETCH_CITYNAME_ERROR,
  FETCH_AUTOCOMPLETE,
  FETCH_AUTOCOMPLETE_ERROR,
  FETCH_POSITION,
  FETCH_POSITION_ERROR,
  FETCH_RESTAURANT,
  FETCH_RESTAURANT_DETAILS,
  FETCH_RESTAURANT_ERROR

} from './actionTypes';

const ROOT_URL = 'https://maps.googleapis.com/maps/api/';
const SUB_URL_CITYNAME = `${ROOT_URL}geocode/json`
const SUB_URL_AUTOCOMPLETE = `${ROOT_URL}place/autocomplete/json`
const API_KEY = 'AIzaSyD4fFnQevgJHshQ8YwrAKvDjL9eF_MDJ3Q'
const google= window.google;
let map;
let service;
export function getLongLat(){
    return function(dispatch) {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition( setPosition, setPositionError);
            function setPosition(position, error){
                dispatch({
                    type: FETCH_POSITION,
                    payload: {latitude:position.coords.latitude, longitude:position.coords.longitude}
                })
            }
            function setPositionError(){
                dispatch({
                    type: FETCH_POSITION_ERROR,
                    payload: 'Unable to get your Position'
                })
            }
        }
        else{
            dispatch({
                type: FETCH_POSITION_ERROR,
                payload: 'Geolocation not supported'
            })
        }
    }
}
export function reverseGeocoding(position){
    return function(dispatch) {
      axios.get(`${SUB_URL_CITYNAME}?key=${API_KEY}&latlng=${position.latitude},${position.longitude}`)
        .then(response => {

            dispatch({
                type: FETCH_CITYNAME,
                payload: response
            })
        })
        .catch(() => {
          // If request is bad...
          // - Show an error to the user
          dispatch({
              type: FETCH_CITYNAME_ERROR,
              payload: 'Error Fetching User\'s city'
          });
        });
    }
}
export function citynameAutoComplete(input){

    
}
function createMapService(latitude, longitude, callback){
    try{
        var mylocation = new google.maps.LatLng(latitude, longitude);
        map = new google.maps.Map(document.getElementById('map'), {
            center: mylocation,
            zoom: 15
        });
        service = new google.maps.places.PlacesService(map);
        callback(null, {service, mylocation} )
    }
    catch(e){
        callback('Error connecting to the Internet... please check your connection', null)
    }
}

export function fetchRestaurants(position){

    return function(dispatch) {
        createMapService(position.latitude, position.longitude,  function(error, response){

            if(error){
                console.log(error)
                dispatch({
                    type: FETCH_RESTAURANT_ERROR,
                    payload: 'Fetching Restaurants failed Please Check your Internet Connection'
                });
            }
            else{
                var request = {
                    location: response.mylocation,
                    radius: '500',
                    type: ['restaurant']
                    // nearbySearchKeys: ['photos', 'place_id', 'name', 'geometry', etc, etc...]
                };
                response.service.nearbySearch(request, function(payload, status){

                    if (status === google.maps.places.PlacesServiceStatus.OK) {

                        _.forEach(payload, function(value){
                            console.log(value);
                        })
                        dispatch({
                            type: FETCH_RESTAURANT,
                            payload: payload
                        });
                    }
                    if(status==="ZERO_RESULTS" && payload.length===0){
                        dispatch({
                            type: FETCH_RESTAURANT_ERROR,
                            payload: "Can't Find A restaurant in your area"
                        });
                    }
                });
            }
        })
    }
}

export function fetchDetails(position, restaurantId) {
    return function(dispatch){
        createMapService(position.longitude, position.latitude, function(error, response){
            if(error){
                dispatch({
                    type: FETCH_RESTAURANT_ERROR,
                    payload: 'Fetching Restaurant failed, Please Check your Internet Connection'
                });
            }
            else{
                response.service.getDetails({ placeId: restaurantId }, function(place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        dispatch({
                            type: FETCH_RESTAURANT_DETAILS,
                            payload : place
                        });
                    }
                });
            }
        })
    }
}
