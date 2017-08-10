import React, {Component} from 'react';
import {fetchRestaurants} from '../../actions';
import {connect} from 'react-redux'
class autocomplete extends(Component){
    shouldComponentUpdate(){
        return false
    }
    componentDidMount(){
        var self=this;
        var placeSearch, autocomplete;
        autocomplete = new window.google.maps.places.Autocomplete(
            this.refs.searchBar,
            {types: ['geocode']}
        );
        autocomplete.addListener('place_changed', fillInAddress);

        function fillInAddress() {
            // Get the place details from the autocomplete object.
            var place = autocomplete.getPlace();
            const position = {latitude:place.geometry.location.lat(), longitude:place.geometry.location.lng()}
            console.log(position)
            self.props.fetchRestaurants(position)
        }
    }
    render(){

        return(
            <input type="text" placeholder="Type Location" ref="searchBar" />
        )


    }
}
export default connect(null, {fetchRestaurants})(autocomplete);
