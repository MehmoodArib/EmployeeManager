import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import EmployeeForm from './EmployeeForm';


class EmployeeEdit extends Component {
    static navigationOptions = {
        title: 'Edit Employee',
    };

    state = { showModal: false };

    componentWillMount() {
        _.each(this.props.employee, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        });
    }
    onAccept = () => {
        const { uid } = this.props.employee;
        this.props.employeeDelete({ uid });
        console.log(uid);
        this.setState({ showModal: false });
    }

    onDecline = () => {
        this.setState({ showModal: false });
    }
    onButtonPress() {
        const { name, phone, shift } = this.props;
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;
        // eslint-disable-next-line import/no-named-as-default-member
        Communications.text(phone, `Your Shift is on ${shift}`);
    }

    render() {
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button
                        buttonText="Save Changes"
                        onPress={this.onButtonPress.bind(this)}
                    />
                </CardSection>

                <CardSection>
                    <Button
                        buttonText="Text Schedule"
                        onPress={this.onTextPress.bind(this)}
                    />
                </CardSection>

                <CardSection>
                    <Button
                        buttonText="Fire Employee"
                        onPress={() => this.setState({ showModal: !this.state.showModal })}
                    />
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept}
                    onDecline={this.onDecline}
                >
                    Are you sure you want to delete this?
                </Confirm>

            </Card>
        );
    }
}
const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;
    return { name, phone, shift };
};


export default connect(mapStateToProps,
    { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
