import React, { Component } from 'react';
import { FlatList } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HeaderButtons, HeaderButton, Item } from 'react-navigation-header-buttons';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import { NavigationActions } from 'react-navigation';

const MaterialIcons = passMeFurther => (
    <HeaderButton {...passMeFurther} IconComponent={Icon} iconSize={24} color="black" />
  );

class EmployeeList extends Component {
    static navigationOptions = ({ navigation }) =>({
        title: 'Employees',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={MaterialIcons}>
                <Item title="search" iconName="menu" onPress={() => navigation.toggleDrawer()} />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={MaterialIcons}>
                <Item title="search" iconName="add" onPress={() => navigation.navigate('employeeCreate')} />
            </HeaderButtons>
        )
    });

    componentDidMount() {
        this.props.employeesFetch();
    }

    renderRow({ item }) {
        return <ListItem employee={item} />;
    }

    render() {
        return (
            <FlatList
                style={{ flex: 1 }}
                data={this.props.employees}
                renderItem={this.renderRow}
            />
        );
    }
}

const mapStateToProps = state => {
    const employees = _.map(state.employees, (val, uid) => {
        return { ...val, uid };
    });
    return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
