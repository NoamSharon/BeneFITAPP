import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { Button, ActionButton } from 'react-native-material-ui';
import { MapView } from 'expo';
import LocationPage from './LocationPage';
import styles from './pageStyle';
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

var _Latitude = 0;
var _Longitude = 0;
const { Marker } = MapView;
var Code = 0;

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state =
      {
        Toggle: '',
        UserCode: 0,
        StartTime: '2019-03-16 08:00:00.123',
        EndTime: '2019-03-16 12:00:00.123',
        Latitude: 0,
        Longitude: 0,
        WithTrainer: false,
        WithPartner: false,
        GroupWithTrainer: false,
        GroupWithPartners: false,
        Status: 0,
        couple_results: [],
        group_results: []
      };
  }

  boolToInt(b) {
    if (b == true)
      return 1;
    else return 0;
  }
  UNSAFE_componentWillMount() {
    Code = this.props.navigation.getParam('UserCode', 0);
    () => this.setState({ UserCode: Code });
    this.getCurrentLocation();
  }

  search() {
    const OnlineDetails = {
      UserCode: Code,
      Latitude: this.state.Latitude,
      Longitude: this.state.Longitude,
      StartTime: this.state.StartTime,
      EndTime: this.state.EndTime,
      WithTrainer: this.boolToInt(this.state.WithTrainer),
      WithPartner: this.boolToInt(this.state.WithPartner),
      GroupWithTrainer: this.boolToInt(this.state.GroupWithTrainer),
      GroupWithPartners: this.boolToInt(this.state.GroupWithPartners),
    }

    fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/InsertOnlineTrainee', {

      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(OnlineDetails),
    })
      .then(res => res.json())
      .then(response => {
        this.setState({couple_results:response});
      })

      .catch(error => console.warn('Error:', error.message));

    if (this.state.GroupWithTrainer || this.state.GroupWithPartners) {
      fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/SearchGroups', {

        method: 'POST',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify(OnlineDetails),
      })
        .then(res => res.json())
        .then(response => {
          this.setState({group_results:response});
        })

        .catch(error => console.warn('Error:', error.message));
    }
  }

  getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const output =
          'latitude=' + position.coords.latitude +
          '\nlongitude=' + position.coords.longitude +
          '\naltitude=' + position.coords.altitude +
          '\nheading=' + position.coords.heading +
          '\nspeed=' + position.coords.speed;

        this.setState({Latitude:position.coords.latitude, Longitude: position.coords.longitude, Status:1}) ;// +  Math.random()/1000,

      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }

    );
  };


  render() {
    if (this.state.Status == 1) {
      return (
        <ScrollView>
          <Container>
            <GooglePlacesAutocomplete
              placeholder="Search"
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'}
              listViewDisplayed="false"
              fetchDetails={true}
              renderDescription={row => row.description || row.formatted_address || row.name}
              onPress={(data, details = null) => {
                this.setState({Latitude:details.geometry.location.lat , Longitude:details.geometry.location.lng });

              }}
              getDefaultValue={() => {
                return ''; // text input default value
              }}
              query={{

                key: 'AIzaSyB_OIuPsnUNvJ-CN0z2dir7cVbqJ7Xj3_Q',
                language: 'en', // language of the results
                types: '(cities)', // default: 'geocode'
              }}

              styles={{
                description: {
                  fontWeight: 'bold',
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                },
              }}
              enablePoweredByContainer={true}

              nearbyPlacesAPI="GoogleReverseGeocoding"

              GooglePlacesSearchQuery={{

                rankby: 'distance',
                types: 'food',
              }}
              filterReverseGeocodingByTypes={[
                'locality',
                'administrative_area_level_3',
              ]}

              debounce={200}
              
            />
            <View><ActionButton icon="place" onPress={this.getCurrentLocation} /></View>

            <Content>
              <ListItem>
                <CheckBox checked={this.state.WithTrainer}
                  onPress={() => this.setState({ WithTrainer: !this.state.WithTrainer })} />
                <Body>
                  <Text>With Trainer</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.WithPartner}
                  onPress={() => this.setState({ WithPartner: !this.state.WithPartner })}
                />
                <Body>
                  <Text>With Partner</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.GroupWithTrainer} color="green"
                  onPress={() => this.setState({ GroupWithTrainer: !this.state.GroupWithTrainer })}
                />
                <Body>
                  <Text>Group With Trainer</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.GroupWithPartners} color="green"
                  onPress={() => this.setState({ GroupWithPartners: !this.state.GroupWithPartners })}
                />
                <Body>
                  <Text>Group With Partner</Text>
                </Body>
              </ListItem>
            </Content>

            <Button
              primary text="Search"
              onPress={() => this.search()}
            />

            <LocationPage couple_results={this.state.couple_results} group_results={this.state.group_results} Longitude={this.state.Longitude} Latitude={this.state.Latitude}></LocationPage>

          </Container>
        </ScrollView>


      );
    }
    else return (<Text>hi</Text>);
  }
  
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
