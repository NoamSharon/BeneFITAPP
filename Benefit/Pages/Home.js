import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, CheckBox } from 'react-native';
import { Button, ActionButton} from 'react-native-material-ui';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state =
      {
        Toggle: '',
        StartTime: '',
        EndTime: '',
        Latitude: '',
        Longitude: '',
        WithTrainer: {checked: null},
        WithPartner: true,
        GroupWithTrainer: false,
        GroupWithPartner: false,
      };
  }

  render() {
    return (
      // <View style={styles.container}>
      //   <Text>Hello Home stavstst</Text>
      //   {/* <Button
      //         primary text="go to SignIn page"
      //         icon="arrow-back"
      //         onPress={() => {
      //           this.props.navigation.navigate('SignIn');
      //         }} /> */}
      // </View>

<View contentContainerStyle={styles.contentContainer} >

<View style={{ flexDirection: 'column'}}>
  <CheckBox />
  <View style={{ flexDirection: 'row' }}>
    <CheckBox
      value={this.state.checked}
      onValueChange={() => this.setState({ checked: !this.state.WithTrainer })}
    />
    <Text style={{marginTop: 5}}> With Trainer</Text>
  </View>
</View>


<Text>Start Time:</Text>
<TextInput style={styles.inputText}
  onChangeText={(StartTime) => this.setState({ StartTime })} />

<Text>End Time:</Text>
<TextInput style={styles.inputText}
  onChangeText={(EndTime) => this.setState({ EndTime })} />

<Text>Latitude:</Text>
<TextInput style={styles.inputText}
  onChangeText={(Latitude) => this.setState({ Latitude })} />

<Text>Longitude:</Text>
<TextInput style={styles.inputText}
  onChangeText={(Longitude) => this.setState({ Longitude })} />

<Text>With Trainer:</Text>
<TextInput style={styles.inputText}
  onChangeText={(WithTrainer) => this.setState({ WithTrainer })} />

<Text>With Partner:</Text>
<TextInput style={styles.inputText}
  onChangeText={(WithPartner) => this.setState({ WithPartner })} />

<Text>Group With Trainer:</Text>
<TextInput style={styles.inputText}
  onChangeText={(GroupWithTrainer) => this.setState({ GroupWithTrainer })} />

<Text>Group With Partner:</Text>
<TextInput style={styles.inputText}
  onChangeText={(GroupWithPartner) => this.setState({ GroupWithPartner })} />

<Button
  primary text="Search"
  onPress={() =>this.search()}
/>
</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
