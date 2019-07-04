import firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';


import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER
} from './types';
import NavigationService from '../NavigationService';


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};


export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text,
    };
};


export const loginUser = ({ email, password }) => {
    console.log('loginUser action');
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                console.log('Inside loginUser', user);
                loginUserSuccess(dispatch, user);
            })
            .catch((error) => {
                console.log(error);
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFail(dispatch));
            });
    };
};


const loginUserFail = (dispatch) => {
    console.log('loginUserFail');
    dispatch({ type: LOGIN_USER_FAIL });
};

const storeData = async () => {
    try {
        await AsyncStorage.setItem('isUserLogin', 'true');
    } catch (e) {
        // saving error
        console.log('Saving Error', e);
    }
};

const loginUserSuccess = (dispatch, user) => {
    console.log('loginUserSuccess');
    storeData();
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
    NavigationService.navigate('Main');
};
