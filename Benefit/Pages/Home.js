import React from 'react';
import { StyleSheet, View, ScrollView, TextInput, Dimensions, Image } from 'react-native';
import { Button, ActionButton } from 'react-native-material-ui';
import { MapView } from 'expo';
import LocationPage from './LocationPage';
import styles from './pageStyle';
import { Container, Header, Content, ListItem, CheckBox, Text, Body } from 'native-base';

const { Marker } = MapView;

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state =
      {
        Toggle: '',
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

  boolToInt(b)
  {
    if (b==true)
    return 1;
    else return 0;
  }

  search(){
    const OnlineDetails = {
      UserCode: this.state.UserCode,
      Latitude: this.state.Latitude,
      Longitude: this.state.Longitude,
      StartTime: this.state.StartTime,
      EndTime: this.state.EndTime,
      WithTrainer: this.boolToInt(this.state.WithTrainer),
      WithPartner: this.boolToInt(this.state.WithPartner),
      GroupWithTrainer: this.boolToInt(this.state.GroupWithTrainer),
      GroupWithPartners: this.boolToInt(this.state.GroupWithPartner),
    }
    console.warn(OnlineDetails);

    fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/InsertOnlineTrainee', {

      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(OnlineDetails),
    })
      .then(res => res.json())
      .then(response => {console.warn(response)
      })

      .catch(error => console.warn('Error:', error.message));
  }

  render() {
    const UserCode = this.props.navigation.getParam('UserCode', 0);
    console.warn(UserCode);
    return (
        
          <Container>
            <Content>
              <ListItem>
                <CheckBox checked={this.state.WithTrainer} 
                onPress={()=>this.setState({WithTrainer: !this.state.WithTrainer})}/>
                <Body>
                  <Text>With Trainer</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.WithPartner}
                onPress={()=>this.setState({WithPartner: !this.state.WithPartner})}
                />
                <Body>
                <Text>With Partner</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.GroupWithTrainer} color="green"
                onPress={()=>this.setState({GroupWithTrainer: !this.state.GroupWithTrainer})}
                />
                <Body>
                <Text>Group With Trainer</Text>
                </Body>
              </ListItem>
              <ListItem>
                <CheckBox checked={this.state.GroupWithPartners} color="green"
                onPress={()=>this.setState({GroupWithPartners: !this.state.GroupWithPartners})}
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

          <LocationPage></LocationPage>

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
