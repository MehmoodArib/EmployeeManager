import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import firebase from 'firebase';


class SplashScreen extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            console.log('user', user);
            if (user !== null) {
                this.props.navigation.navigate('Main');
            } else {
                this.props.navigation.navigate('Auth');
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

}

export default SplashScreen;
