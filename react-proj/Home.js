import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ActionButton } from 'react-native-material-ui';

export default class Home extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Home stav sha</Text>
        <Button
              primary text="go to login page"
              icon="arrow-back"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }} />
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
    backgroundColor: 'red',
  },
});
