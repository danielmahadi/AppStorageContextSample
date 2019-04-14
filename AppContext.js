import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AppStorageContext = React.createContext({});

export default class AppStorageProvider extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }

  async componentDidMount() {
    const keys = await AsyncStorage.getAllKeys();
    const asyncStorageData = await AsyncStorage.multiGet(keys);

    let newState = {};

    asyncStorageData.forEach(function(entry) {
      let key = entry[0];
      let value = JSON.parse(entry[1]);

      newState[key] = value;
    });

    this.setState(newState);
  }

  setItem = async ({key, value}) => {
    this.setState({
      [key]: value
    });

    await AsyncStorage.setItem(key, JSON.stringify(value));
  }

  render() {
    const contextData = {
      data: this.state,
      setItem: this.setItem
    };

    return (
      <AppStorageContext.Provider value={contextData}>
        {this.props.children}
      </AppStorageContext.Provider>
    );
  }
}

export const withAppStorageProvider = Component => props => {
  return (
    <AppStorageContext.Consumer>
      {context => <Component {...props} storageContext={context} />}
    </AppStorageContext.Consumer>
  );
}