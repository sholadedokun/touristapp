import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,  Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import './styles/index.css';
import './styles/App.css';

import Header from './components/header';
import Home from './components/home';
import RestuarantDetails from './components/restaurantDetails'
import reducers from './reducers'

import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div className="App">
                <Header />
                <Route  exact path="/"  component={Home} />
                <Route  path="/restaurant/:id"  component={RestuarantDetails} />
            </div>
        </Router>
    </Provider>,

    document.getElementById('root'));
registerServiceWorker();
