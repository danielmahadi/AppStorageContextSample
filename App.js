import React, {Component} from 'react';

import AppStorageProvider from './AppContext';
import ImportantPage from './ImportantPage';

export default class App extends Component {
  render() {
    return (
      <AppStorageProvider>
        <ImportantPage />
      </AppStorageProvider>
    );
  }
}
