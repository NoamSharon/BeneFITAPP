import React from 'react';
import { Text, ScrollView, Image, Link } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import styles from '../Styles/LoginStyle';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.state = {
      Email: '',
      Password: '',
      UserCode: ''
    }

  }

  Login() {
    alert("hi");

    let LoginDetails = {
      Email: this.state.Email,
      Password: this.state.Password
    }

    fetch('http://localhost:58400/api/CheckIfEmailExists', {
      method: 'POST',
      body: JSON.stringify(LoginDetails),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
      .then(response => response.json())
      .then(json => {
        if (json != null) {
          alert('json=${json}');
        }
        else { alert('not good') }
      })
  }


  render() {
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text>Login</Text>
        <RkTextInput
          style={styles.input}
          rkType='rounded'
          placeholder='Email'
          onChangeText={(Email) => this.setState({ Email })}
        />
        <RkTextInput style={styles.input}
          secureTextEntry={true}
          rkType='rounded'
          placeholder='Password'
          onChangeText={(Password) => this.setState({ Password })}
        />
        <Text>Not registered yet?
        <Text
            style={styles.Signin}
            onPress={() => {
              this.props.navigation.navigate('SignIn');
            }}
          > Sign in now!</Text></Text>
        <RkButton
          style={styles.LoginBtn}
          onPress={() => this.Login()}
        >
          Login
          </RkButton>

      </ScrollView>
    );
  }
}


