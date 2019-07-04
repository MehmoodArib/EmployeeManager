/* eslint-disable no-underscore-dangle */
import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}
function pop() {
    _navigator._navigator.pop();
}

// add other navigation functions that you need and export them

export default {
    navigate,
    pop,
    setTopLevelNavigator,
};
