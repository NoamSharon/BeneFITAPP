import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import TimePicker from "react-native-24h-timepicker";
import { Button } from "native-base";


var hour_now=new Date().getHours();
var minute_now=new Date().getMinutes();

export default class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Time: this.props.Time,


    };
  }

  onCancel() {
    this.TimePicker.close();
  }

  onConfirm(hour, minute) {
    this.setState({Time: `${hour}:${minute}` });
    this.TimePicker.close();
    this.props.setTime(`${hour}`, `${minute}`);
    
  }

  render() {
    return (
      <View style={styles.container}>
      
      <Button
      onPress={() => this.TimePicker.open()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{this.state.Time}</Text>
      </Button>
        <TimePicker
        selectedHour={hour_now.toString()}
        selectedMinute={minute_now.toString()}
        
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 0
  },
  button: {
    backgroundColor: "#05A081",
    paddingVertical: 11,
    paddingHorizontal: 17,
    borderRadius: 100,
    marginVertical: 50
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
