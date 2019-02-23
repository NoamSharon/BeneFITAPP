import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './Pages/Login';
import Home from './Home';
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
      Home: Home,
    },
    {
      initialRouteName: 'Home',
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