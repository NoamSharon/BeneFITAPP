import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { Button, ActionButton } from 'react-native-material-ui';
import { MapView } from 'expo';
import LocationPage from './LocationPage';
import styles from './pageStyle';
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const { Marker } = MapView;
var Code = 0;
var couple_results = [];
var group_results = [];

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state =
      {
        Toggle: '',
        UserCode: 0,
        StartTime: '2019-03-16 08:00:00.123',
        EndTime: '2019-03-16 12:00:00.123',
        Latitude: '32.360869',
        Longitude: '34.862154',
        WithTrainer: false,
        WithPartner: false,
        GroupWithTrainer: false,
        GroupWithPartners: false,
      };
  }

  boolToInt(b) {
    if (b == true)
      return 1;
    else return 0;
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
    console.warn(OnlineDetails);

    fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/InsertOnlineTrainee', {

      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(OnlineDetails),
    })
      .then(res => res.json())
      .then(response => {
        couple_results = response;
        console.warn(couple_results);
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
          group_results = response;
          console.warn(group_results);
        })

        .catch(error => console.warn('Error:', error.message));
    }
  }

  render() {
    Code = this.props.navigation.getParam('UserCode', 0);
    () => this.setState({ UserCode: Code });
    console.warn(Code);
    console.warn(this.state.UserCode);
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
            }}
            getDefaultValue={() => {
              return ''; // text input default value
            }}
            query={{

              key: 'AIzaSyAKZW8kDSPbc-2w0hopNeWcxUHZetgzA4w&v=3',
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

          <LocationPage couple_results={couple_results} group_results={group_results}></LocationPage>

          {/* <View style={{ flexDirection: 'column'}}>
  <CheckBox />
  <View style={{ flexDirection: 'row' }}>
    <CheckBox
      value={this.state.WithTrainer}
      onValueChange={() => this.setState({ WithTrainer: !this.state.WithTrainer })}
    />
    <Text style={{marginTop: 5}}> With Trainer</Text>
  </View>
</View> */}
        </Container>
      </ScrollView>


    );
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
