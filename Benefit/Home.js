import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ActionButton } from 'react-native-material-ui';

export default class Home extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Home stavstst</Text>
        <Button
              primary text="go to SignIn page"
              icon="arrow-back"
              onPress={() => {
                this.props.navigation.navigate('SignIn');
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
    backgroundColor: 'blue',
  },
});
