import React from 'react';
import { StyleSheet, Text, ScrollView, TextInput } from 'react-native';
import DateTimePickerTest from './DateTimePickerTest';
import { Button, ActionButton } from 'react-native-material-ui';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);

    // this.submit=this.submit.bind(this);
this.test = this.test.bind(this);
this.handleErrors = this.handleErrors.bind(this);
    this.state =
      {
        Email: '',
        FirstName: '',
        LastName: '',
        Password: '',
        Gender: '',
        DateOfBirth: '',
        Picture: '',
        SearchRadius: 5,
        IsTrainer: 0,
        SportCategory: [1, 2, 3],
        MinBudget : 100,
        MaxBudget : 200,
        PartnerGender : 'female',
        TrainerGender : 'female'
      };
  }

  setDateOfBirth = (date) => {
    this.setState({ DateOfBirth: date });
    
  }

  submit() {
    let User = {}
    User.Email = this.state.Email;
    User.FirstName = this.state.FirstName;
    User.LastName = this.state.LastName;
    User.Password = this.state.Password;
    User.Gender = this.state.Gender;
    User.DateOfBirth = this.state.DateOfBirth.toString();
    User.Picture = this.state.Picture;
    User.SearchRadius = this.state.SearchRadius;
    User.IsTrainer = this.state.IsTrainer;
    User.SportCategories = this.state.SportCategory;
    User.MinBudget = this.state.MinBudget;
    User.MaxBudget = this.state.MaxBudget;
    User.PartnerGender = this.state.PartnerGender;
    User.TrainerGender = this.state.TrainerGender;
    console.warn(User);
    
    // var URL = 'http://localhost:58400/api/InsertTrainee';
    // fetch(URL, {
    //   method: 'POST',
    //   body: JSON.stringify(User),
    //   headers:({
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   })
    // }).then(res => res.json())
    //   .catch(error => console.error('Error:', error))
    //   .then(response => console.log('Success:', response));

    let url = 'http://localhost:58400/api/test';
    fetch(url)
    .then(this.handleErrors)      
    .then(response => response.json())
    .then(data => this.test(data))
    .catch(error => console.log("There was an error in getting the persons" ));
  }

  handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    
    }
            return response;
}

  test (data)
  {
    console.log(data);
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>Email:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(Email) => this.setState({ Email })} />

        <Text>First Name:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(FirstName) => this.setState({ FirstName })} />

        <Text>Last Name:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(LastName) => this.setState({ LastName })} />

        <Text>Password:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(Password) => this.setState({ Password })} />

        <Text>Gender:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(Gender) => this.setState({ Gender })} />

        {/* <Text>Date Of Birth:</Text> */}
        <DateTimePickerTest setDateOfBirth={this.setDateOfBirth}></DateTimePickerTest>

        <Text>Picture:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(Picture) => this.setState({ Picture })} />

        <Text>Serch Radius:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(SearchRadius) => this.setState({ SearchRadius })} />

        <Text>Is Trainer?:</Text>
        <TextInput style={styles.inputText}
          onChangeText={(IsTrainer) => this.setState({ IsTrainer })} />

        <Button
          primary text="Submit"
          onPress={() =>this.submit()}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'gray',
  },

  inputText: {
    padding: 5,
    color: 'white',
  }
});
