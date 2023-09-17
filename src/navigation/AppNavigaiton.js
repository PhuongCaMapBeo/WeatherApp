import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import { Ic_Map } from '../components/Icons/Ic_Map';
import { Ic_Bar } from '../components/Icons/Ic_Bar';
import { Ic_Circle } from '../components/Icons/Ic_Circle';
import { Ic_Future } from '../components/Icons/Ic_Future';
import MapScreen from '../screens/MapScreen';
import FutureScreen from '../screens/FutureScreen';
import HistoryScreen from '../screens/HistoryScreen';
import {theme} from '../theme/index';

const Tab = createBottomTabNavigator();

const iconComponents = {
  Map: {focused: Ic_Map, unfocused: Ic_Map},
  Future: {focused: Ic_Future, unfocused: Ic_Future},
  Circle: {focused: Ic_Circle, unfocused: Ic_Circle},
  History: {focused: Ic_Bar, unfocused: Ic_Bar},
};

function AppNavigation() {

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: () => null, 
        tabBarIcon: ({color, focused, size}) => {
          const IconComponent = focused
            ? iconComponents[route.name].focused
            : iconComponents[route.name].unfocused;

          return <IconComponent color={color} size={size} />;
        },

        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          backgroundColor: "#000",
          opacity: 0.6,

          height:40,
          borderColor: "#fff",
          borderTopWidth: 1,
        },
        tabBarHideOnKeyboard:true,
      })}>
      <Tab.Screen
        name="Map"
        options={({navigation}) => ({
          headerShown: false
        })}
        component={MapScreen}
      />
      <Tab.Screen
        name="Future"
        options={({navigation}) => ({
          headerShown: false
        })}
        component={FutureScreen}
      />
      <Tab.Screen
        name="Circle"
        options={({navigation,route}) => ({
          tabBarLabelStyle: {
            fontWeight: navigation.isFocused() ? '600' : '400',
            fontSize:13,
            marginTop:5
          },
          headerShown: false,
        })}
        component={HomeScreen}
      />
      <Tab.Screen
        name="History"
        options={({navigation}) => ({
          tabBarLabelStyle: {
            fontWeight: navigation.isFocused() ? '600' : '400',
            fontSize:13,
            marginTop:5
          },
          headerShown: false
        })}
        component={HistoryScreen}
      />
    </Tab.Navigator>
  );
}

export default AppNavigation;

