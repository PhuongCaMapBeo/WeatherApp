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

export default function Main() {
  return (
    <PaperProvider>
       <PopupRootProvider>
      <App />
      </PopupRootProvider>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);