import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class DateTimePickerTest extends Component {
  state = {
    isDateTimePickerVisible: false,
    selectedDate: '',
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    console.log('A date has been picked: ', date);
    this.props.setDateOfBirth(date);
    this._hideDateTimePicker();
  };

  render() {
    return (
      <View style={{ flex: 1}}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
        <Text>Date Of Birth:</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }

}