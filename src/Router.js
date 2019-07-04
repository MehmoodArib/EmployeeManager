import {
    createAppContainer, createStackNavigator,
    createDrawerNavigator, createSwitchNavigator
} from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import LogInForm from './components/LogInForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';
import DrawerContent from './components/drawer/DrawerContent';


const MainNavigator = createStackNavigator({
    employeeList: {
        screen: EmployeeList,
    },
    employeeCreate: {
        screen: EmployeeCreate,
    },
    employeeEdit: {
        screen: EmployeeEdit,
    }
}, { initialRouteName: 'employeeList' }
);

const DrawerNavigator = createDrawerNavigator({
    MainNavigator
}, {
        contentComponent: DrawerContent
    }
);

const LoginStack = createStackNavigator({
    LogInForm
});

const FirstSwitcher = createSwitchNavigator({
    Auth: LoginStack,
    Main: { screen: DrawerNavigator }
});

const SecondSwitcher = createSwitchNavigator({
    Splash: SplashScreen,
    FirstSwitcher
});

export default createAppContainer(SecondSwitcher);
