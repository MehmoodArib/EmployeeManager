import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import NavigationService from '../../NavigationService';
import { Button, CardSection } from '../common';

class DrawerContent extends Component {

  onButtonPress() {
    firebase.auth().signOut().then(() => {
      NavigationService.navigate('ChatScreen', { userName: 'Lucy' });
    }).catch({
      // An error happened.
    });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <CardSection>
          <Button
            onPress={this.onButtonPress.bind(this)}
            buttonText="LogOut"
          />
        </CardSection>
      </View>
    );
  }
}
export default DrawerContent;
