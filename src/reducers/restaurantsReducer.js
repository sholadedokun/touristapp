import {
    FETCH_POSITION, FETCH_POSITION_ERROR,
    FETCH_CITYNAME,
    FETCH_CITYNAME_ERROR,
    FETCH_RESTAURANT,
    FETCH_RESTAURANT_DETAILS, 
    FETCH_RESTAURANT_ERROR

} from '../actions/actionTypes';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_POSITION:
          return { ...state, fetched: true, error:'', position:action.payload };
    case FETCH_POSITION_ERROR:
                return { ...state, fetched: true, error:action.payload };
    case FETCH_CITYNAME:
          return { ...state, fetched: true, error:'', cityName:action.payload };
    case FETCH_CITYNAME_ERROR:
                return { ...state, fetched: true, error:action.payload };
    case FETCH_RESTAURANT:
        return { ...state, fetched: true, error:'', newRestaurants:action.payload };
    case FETCH_RESTAURANT_DETAILS:
        return { ...state, fetched: true, error:'', restaurantDetails:action.payload };
    case FETCH_RESTAURANT_ERROR:
        return { ...state, fetched: true, error:action.payload};
  }
  return state;
}
