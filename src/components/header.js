import React, {Component} from 'react';
import { getLongLat, reverseGeocoding, citynameAutoComplete } from '../actions';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import AutoComplete from './googleMapWrapper/autoComplete'


class Header extends(Component){
    constructor(props){
        super();
        // this.renderInput= this.renderInput.bind(this);
        // this.autocomplete= this.autocomplete.bind(this);
    }
    componentWillMount(){
        this.props.getLongLat();
    }

    render(){
        const { handleSubmit, allRestaurants } =this.props
        if(allRestaurants.position && !allRestaurants.cityName && allRestaurants.error !=='') {
            this.props.reverseGeocoding(allRestaurants.position)
        }
        console.log(allRestaurants.cityName)
        return(
            <div className="App-header">
            {
                allRestaurants.cityName ?
                    <h2>Find a Restaurant Near <br />
                        {}
                    </h2>
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
function validate(values){
    const errors={}
    if(!values.searchBar){
        errors.searchBar = 'Please Type a search term';
    }
    if(values.length < 3 ){
        errors.SearchBar = 'Search term must be atleast 3 characters';
    }

    return errors

}
function mapStateToProps(state){
    return{
        allRestaurants:state.allRestaurants
    }
}
export default reduxForm({
    validate,
    form: 'searchBar'

})(connect(mapStateToProps, {getLongLat, reverseGeocoding, citynameAutoComplete})(Header))
