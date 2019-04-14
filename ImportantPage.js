import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { withAppStorageProvider } from './AppContext';

class ImportantPage extends Component {

  buttonPressed = async () => {
    const { storageContext } = this.props;
    const { setItem, data } = storageContext;

    let counter = 0;

    if (data['counter']) {
      counter = data['counter'];
    }

    await setItem({
      key: 'counter', 
      value: counter +1
    });

  }

  render() {
    const instructions = Platform.select({
      ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
      android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
    });

    const { storageContext } = this.props;
    const { data } = storageContext;

    let counter = 0;

    if (data['counter']) {
      counter = data['counter'];
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableHighlight onPress={this.buttonPressed}>
          <Text>Press Me! {counter}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default withAppStorageProvider(ImportantPage);