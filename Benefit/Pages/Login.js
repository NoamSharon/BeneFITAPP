import React from 'react';
import { Text, ScrollView, Image, Link, ImageBackground } from 'react-native';
import { RkTextInput, RkButton } from 'react-native-ui-kitten';
import styles from '../Styles/LoginStyle';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.Login = this.Login.bind(this);
    this.CheckPassword = this.CheckPassword.bind(this);
    this.state = {
      Email: '',
      Password: '',
      UserCode: '',
      IsTrainer: ''
    }

  }

  CheckPassword() {
    const LoginDetails = {
      Email: this.state.Email,
      Password: this.state.Password
    }
     fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/CheckIfPasswordMatches', {

      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify(LoginDetails),
    })
      .then(res => res.json())
      .then(response => {
        if (response.UserCode != 0) {
          this.setState({ UserCode: response.UserCode, IsTrainer: response.IsTrainer });
          this.props.navigation.navigate('Home', {UserCode: this.state.UserCode});
        }
        else
          alert("Incorrect password");
      })

      .catch(error => console.warn('Error:', error.message));
  }


  Login() {
    
    fetch('http://proj.ruppin.ac.il/bgroup79/test1/tar6/api/CheckIfEmailExists?Email=' + this.state.Email, {
      method: 'POST',
      headers: { "Content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({}),

    })
      .then(res => res.json())
      .then(response => {
        if (response) {
          this.CheckPassword();
        }
        else alert('Email not exist in the system');
      })

      .catch(error => console.warn('Error:', error.message));
  }


  render() {
    return (

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <ImageBackground source={{ uri: 'https://images.pexels.com/photos/421160/pexels-photo-421160.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} style={styles.backgroundImage} blurRadius={2}>
          <Image
            source={{ uri: 'http://proj.ruppin.ac.il/bgroup79/test1/tar6/Images/Logo.png' }}
            style={styles.LogoImg} />


          <Text style={styles.LoginText}>Login</Text>
          <RkTextInput style={styles.text}
            style={styles.input}
            rkType='rounded'
            placeholder='Email'
            // value='stav@gmail.com'
            onChangeText={(Email) => this.setState({ Email })}
          />
          <RkTextInput style={styles.input}
            secureTextEntry={true}
            rkType='rounded'
            placeholder='Password'
            // value='12345'
            onChangeText={(Password) => this.setState({ Password })}
          />
          <Text style={styles.text} >Not registered yet?
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
        </ImageBackground>
      </ScrollView>
    );
  }
}


