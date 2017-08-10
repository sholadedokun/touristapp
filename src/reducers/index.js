import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import restaurantsReducer from './restaurantsReducer';

const rootReducer = combineReducers({
  form,
  allRestaurants: restaurantsReducer
});

export default rootReducer;
