import React from 'react';
import Icon from './icon';
import Image from './image';
import Rating from './rating';
export default ({author_name, profile_photo_url, rating, relative_time_description, text})=>{
    return(
        <div className="review">
            <Image url={profile_photo_url} type='profileImage' width='100px' height='100px' />
            <span>{author_name}</span><br />
            <Rating  className="starRate"  ratings={rating} maxRatings={5} />
            <span>{relative_time_description}</span>
            <div>{text} </div>
        </div>
    )
}
