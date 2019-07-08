import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import firebase from 'firebase';
import NavigationService from './NavigationService';
import reducers from './reducers';
import Router from './Router';

const middlewares = [ReduxThunk, logger];


const store = createStore(reducers, {}, applyMiddleware(...middlewares));

class App extends Component {

    constructor(props) {
        super(props);
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDiZU_kMomiD3euK9t2oEMlQafuYJQM21o",
            authDomain: "manager-13a0f.firebaseapp.com",
            databaseURL: "https://manager-13a0f.firebaseio.com",
            projectId: "manager-13a0f",
            storageBucket: "manager-13a0f.appspot.com",
            messagingSenderId: "950376566106",
            appId: "1:950376566106:web:37ffa299a54ff751"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

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

