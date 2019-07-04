import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import NavigationService from './NavigationService';
import reducers from './reducers';
import Router from './Router';

const middlewares = [ReduxThunk, logger];


const store = createStore(reducers, {}, applyMiddleware(...middlewares));

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Router
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }} 
                />
            </Provider>
        );
    }
}


export default App;

