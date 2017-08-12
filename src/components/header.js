import React, {Component} from 'react';
import { getLongLat, reverseGeocoding, switcher} from '../actions';
import { connect } from 'react-redux'
import AutoComplete from './googleMapWrapper/autoComplete'


class Header extends(Component){
    constructor(props){
        super();
        this.switchToAutofill=this.switchToAutofill.bind(this);
    }
    componentWillMount(){
        //when our application is about to mount we want to run this action to get current longitude and latidude
        //from the user's device
        this.props.getLongLat();
    }
    componentWillReceiveProps(nextProps){
        //whenever our component wants to receive another property
        //if we have a position(long and lang) and we haven't resolve the cityName and we don't have any errors
        if(nextProps.allRestaurants.position && !nextProps.allRestaurants.cityName && nextProps.allRestaurants.error ==='') {
            //then we want to resolve our Geocode / postion coordinate to a city name
            nextProps.reverseGeocoding(nextProps.allRestaurants.position)
        }
    }
    //if we want to manually switch to autofill
    switchToAutofill(event){

        event.preventDefault()
        this.props.switcher()
    }

    render(){
        const { allRestaurants } = this.props
        return(
            <div className="App-header">
            {
                allRestaurants.cityName ?
                    <div>
                        <h2>Find a Restaurant Near <br />
                            {allRestaurants.cityName[0].formatted_address}
                        </h2>
                        <a href="#" onClick={this.switchToAutofill}> Not Your Location ? use the city finder </a>
                    </div>
                :
                <div className="searchBar">
                    <h2>Sorry we could not locate you automatically, please use the form below</h2>
                    <form>
                        <AutoComplete />
                    </form>
                </div>
            }
            </div>
        )
    }
}
//to connet to our this component's prop to our state
function mapStateToProps(state){
    return{
        allRestaurants:state.allRestaurants
    }
}
//wrapping our connect with the component
export default connect(mapStateToProps, {getLongLat, reverseGeocoding, switcher})(Header)
