import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchDetails} from '../actions';
import Rating from './rating';
import Button from './button';
import Image from './image'
import {Col} from 'react-bootstrap';
class Restaurant extends(Component){
    render(){

        const {name, rating, review, vicinity, place_id,  icon, opening_hours, photos, types} = this.props
        const opened = opening_hours? (opening_hours.open_now ? 'Yes': 'No') :'Not Available'
        const RestaurantType= types.splice(0, 2).toString().replace(',', ' | ').replace(/(?:^|\s)\S/g, l => l.toUpperCase());
        const profileImage= photos ? photos[0].getUrl({'maxWidth': 400}) || icon : icon
        return(
            <Col md={3} sm={6} xs={12} componentClass="li" col className="storyContainer">
                <div className="restaurantContainer">
                    <div name='imageContainer' className="imageContainer">
                        <Image width='300px' height='250px' type='productImage'  url={profileImage} />
                    </div>
                    <div className="restaurantDetails">
                        <div>
                            <span className="name">{name}</span>
                        </div>
                        <div>
                            <Rating className="starRate" ratings={rating} reviews={review} maxRatings={5} />

                        </div>
                        <div>
                            <span>{RestaurantType}</span>

                        </div>
                        <div>
                            <div className="smallTitle">Address</div>
                            <span className="category">{vicinity}</span>
                        </div>
                        <div>
                            <span className="smallTitle">Opened Now :</span>
                            <span className="">{opened}</span>
                        </div>
                    </div>
                    <div className="buttonContainer">
                        <Button value="View Details" type="primary" icon='star-o' link={`restaurant/${place_id}`}/>
                    </div>
                </div>
            </Col>
        )
    }

}

export default connect(null, {fetchDetails})(Restaurant);
