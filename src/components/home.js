import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchRestaurants} from '../actions';
import Restaurant from './restaurant.js';
import _ from 'lodash';
class Home extends (Component){

    render(){
        const { fetched, newRestaurants, error } = this.props.allRestaurants;
        let allRestaurants= <div>Loading</div>
        if(this.props.position && !newRestaurants ){

            this.props.fetchRestaurants(this.props.position)
        }
        if(newRestaurants && error ==='' ){
            allRestaurants= _.map(newRestaurants, (item)=>{
                return (
                    <Restaurant key={item.id} {...item} />
                )
            });
        }
        else if(error !== ''){
            allRestaurants=<div>{error}</div>
        }


        return(
            <div className="container">
                <div className="App-intro">
                     <p>
                        <h1> Find A Restaurant Helper </h1>
                     </p>
                </div>
                <ul>

                {allRestaurants}</ul>
            </div>
        )
    }
}
function mapPropsToState(state){
    return{
            allRestaurants: state.allRestaurants,
            position : state.allRestaurants.position
        }

}
export default connect(mapPropsToState, {fetchRestaurants})(Home)
