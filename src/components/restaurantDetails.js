import React, {Component} from 'react';
import { fetchDetails } from '../actions';
import { connect } from 'react-redux';
import Rating from './rating';
import Button from './button';
import Image from './image'
import Review from './review'

class restuarantDetails extends(Component){
    addUserReview(){
        var win = window.open(`https://search.google.com/local/writereview?placeid=${this.props.match.params.id}`, '_blank');
        win.focus();
    }
    render(){
        var profileImage, photos, icon, name, reviews, allReviews = '';
        if(this.props.position){
            this.props.fetchDetails(this.props.position, this.props.match.params.id)
        }
        if( this.props.restaurantDetails){
            var { photos, icon, name, reviews } = this.props.restaurantDetails
            profileImage = photos ? photos[0].getUrl({'maxWidth': 400}) || icon : icon
            if(reviews){
                allReviews = reviews.map((review)=>{
                    return(
                        <Review key={review.time} {...review} />
                    )
                })
            }
        }
        return(
            <div className="restaurantDetailsContainer">
            {
                this.props.restaurantDetails ? (
                    <div>
                        <div className="detailsPhoto">
                            <Image parentSize={document.getElementsByClassName('imageContainer')}  width='200px' height='300px' type='productImage' url={profileImage} />
                        </div>
                        <div className="detailsDescription">
                            {name}
                            {allReviews}
                            <Button type="primary"  action={this.addUserReview.bind(this)} icon="plus" value="Add A Review"  />
                        </div>
                    </div>

                )
                :
                <div> Loading </div>
            }
            </div>
        )


    }
}
function mapStateToProp(state){
    return {
        restaurantDetails:state.allRestaurants.restaurantDetails,
        position : state.allRestaurants.position
    }
}
export default connect(mapStateToProp, {fetchDetails})(restuarantDetails)
