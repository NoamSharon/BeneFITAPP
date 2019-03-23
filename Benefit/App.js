import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './Pages/Login';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import { ThemeProvider } from 'react-native-material-ui';

class App extends React.Component {
    render() {
      return (
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      );
    }
  }

  const AppNavigator = createStackNavigator(
    {
      Login: Login,
      SignIn: SignIn,
      Home:Home,
      
    },
    
    {
      initialRouteName: 'Login',
    }
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default createAppContainer(AppNavigator);