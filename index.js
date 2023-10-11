/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import App from './App';
import {Root as PopupRootProvider} from 'react-native-popup-confirm-toast';
import store  from './src/redux/store'
import { Provider } from 'react-redux'

export default function Main() {
  return (
    <Provider store={store}>
    <PaperProvider>
       <PopupRootProvider>
      <App />
      </PopupRootProvider>
    </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);