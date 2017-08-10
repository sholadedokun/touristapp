import React, {Component} from 'react';

class autocomplete extends(Component){
    shouldComponentUpdate(){
        return false
    }
    componentDidMount(){
        console.log(this)
        var placeSearch, autocomplete;
            autocomplete = new window.google.maps.places.Autocomplete(
                this.refs.searchBar,
                {types: ['geocode']}
            );
            autocomplete.addListener('place_changed', fillInAddress);

            function fillInAddress() {
                // Get the place details from the autocomplete object.
                var place = autocomplete.getPlace();
                console.log(place)

            }
    }
    render(){

        return(
            <input type="text" placeholder="Type Location" ref="searchBar" />
        )


    }
}
export default autocomplete;
