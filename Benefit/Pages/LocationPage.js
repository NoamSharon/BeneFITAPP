import React from 'react';
import { Text, View, Dimensions, Image } from 'react-native';
import styles from './pageStyle';
import { Button, ActionButton } from 'react-native-material-ui';
import { MapView } from 'expo';
const { Marker } = MapView;

_Latitude = 0;
_Longitude = 0;
export default class LocationPage extends React.Component {
  static navigationOptions = {
    title: 'LOCATION',
  };
  constructor(props) {
    super(props);
    this.state = {
      Latitude: 0,
      Longitude: 0
    }
    this.show = this.show.bind(this);
  }

  show() {
    console.warn('show');
    return this.props.couple_results.map((data) => {
      return (
        <Marker
          coordinate={{
            latitude: data.Latitude,
            longitude: data.Longitude
          }}
        // title={result.FirstName}
        // description={result.Age}
        //image={require('../assets/icon.png')}
        />
      )
    })

  }

  render() {
    console.warn('dvs' + this.props.couple_results);
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
                latitude: this.props.Latitude,
                longitude: this.props.Longitude,
                latitudeDelta: 0.01322,
                longitudeDelta: 0.01321,
              }}
            >
              <Marker
                coordinate={{
                  latitude: this.props.Latitude,
                  longitude: this.props.Longitude
                }}
                title='my place:)'
                description='here i am'
              //image={require('../assets/icon.png')}
              />
              {this.props.couple_results.map(data => (
                <Marker
                  coordinate={{
                    latitude: data.Latitude,
                    longitude: data.Longitude
                  }}
                title={data.FirstName}
                description={''+data.Age}
                //image={require('../assets/icon.png')}
                />
              )
              )}
              {this.props.group_results.map(data => (
                <Marker
                  coordinate={{
                    latitude: data.Latitude,
                    longitude: data.Longitude
                  }}
                title={data.FirstName}
                description={''+data.Age}
                //image={require('../assets/icon.png')}
                />
              )
              )}


              {/* {this.props.couple_results && this.show()} */}



            </MapView>




          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: Dimensions.get('window').width - 10,
              flexDirection: 'row-reverse'
            }}>

          </View>
        </View>
      </View>
    );

  }

}