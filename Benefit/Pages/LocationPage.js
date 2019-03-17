import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import styles from './pageStyle';
import { Button, ActionButton } from 'react-native-material-ui';
import { MapView } from 'expo';
const { Marker } = MapView;

export default class LocationPage extends React.Component {
  static navigationOptions = {
    title: 'LOCATION',
  };
  constructor(props) {
    super(props);
    this.state = {
      latitude: 32.360869,
      longitude: 34.862154
    }
  }

  btnLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const output =
          'latitude=' + position.coords.latitude +
          '\nlongitude=' + position.coords.longitude +
          '\naltitude=' + position.coords.altitude +
          '\nheading=' + position.coords.heading +
          '\nspeed=' + position.coords.speed

        this.setState(
          {
            latitude: position.coords.latitude,// +  Math.random()/1000,
            longitude: position.coords.longitude
          });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  render() {   
    return (
      <View style={styles.container}>
        <View style={styles.Header}>
          <View style={{ margin: 10, justifyContent: 'flex-start' }}>
          </View>
        </View>
        <View style={styles.Content}>
          <View style={{
            borderColor: 'black',
            borderWidth: 1,
          }}>
            <MapView
              style={{
                flex: 1,
                width: Dimensions.get('window').width - 30,
              }}
              region={{
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                latitudeDelta: 0.01322,
                longitudeDelta: 0.01321,
              }}
            >
              <Marker
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
                title='my place:)'
                description='here i am'
                //image={require('../assets/icon.png')}
              />
            </MapView>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: Dimensions.get('window').width - 10,
              flexDirection: 'row-reverse'
            }}>
            <ActionButton icon="place" onPress={this.btnLocation} />
          </View>
        </View>
      </View>
    );
  }
}